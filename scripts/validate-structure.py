#!/usr/bin/env python3
"""Structural validation for the vault-onboarding skill.

Checks the invariants that keep SKILL.md, references/, and assets/ coherent:
frontmatter keys, {{MARKER}} well-formedness, conditional-block nesting,
internal path resolution, variable-table/usage agreement, and asset counts.
Exits non-zero with a list of failures; prints PASS per check otherwise.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
errors = []


def check(label, ok, detail=""):
    if ok:
        print(f"PASS  {label}")
    else:
        errors.append(f"{label}: {detail}")
        print(f"FAIL  {label}: {detail}")


def asset_files():
    return sorted(p for p in (ROOT / "assets").rglob("*.md"))


# 1. SKILL.md frontmatter carries the Agent Skills required keys.
skill_text = (ROOT / "SKILL.md").read_text()
fm = re.match(r"\A---\n(.*?)\n---\n", skill_text, re.DOTALL)
check(
    "SKILL.md frontmatter has name + description",
    fm is not None
    and re.search(r"^name:", fm.group(1), re.M)
    and re.search(r"^description:", fm.group(1), re.M),
    "missing frontmatter block or required keys",
)

# 2. Marker well-formedness: every line's {{ and }} counts agree.
for path in asset_files() + [ROOT / "SKILL.md"]:
    bad = [
        str(n)
        for n, line in enumerate(path.read_text().splitlines(), 1)
        if line.count("{{") != line.count("}}")
    ]
    check(
        f"balanced marker braces: {path.relative_to(ROOT)}",
        not bad,
        f"unbalanced {{{{ }}}} on line(s) {', '.join(bad)}",
    )

# 3. Conditional nesting: {{#IF_X}} / {{^IF_X}} open, {{/IF_X}} closes the
#    innermost open block of the same name (block and inline forms alike).
COND = re.compile(r"\{\{([#^/])(IF_[A-Z0-9_]+)\}\}")
for path in asset_files():
    stack, problem = [], None
    for n, line in enumerate(path.read_text().splitlines(), 1):
        for kind, name in COND.findall(line):
            if kind in "#^":
                stack.append((name, n))
            elif not stack or stack.pop()[0] != name:
                problem = f"line {n}: {{{{/{name}}}}} has no matching open"
                break
        if problem:
            break
    if not problem and stack:
        problem = f"unclosed {stack[-1][0]} opened on line {stack[-1][1]}"
    check(f"conditional nesting: {path.relative_to(ROOT)}", problem is None, problem or "")

# 4. Internal path references in SKILL.md and references/ resolve on disk.
PATH_REF = re.compile(r"`((?:references|assets)/[A-Za-z0-9_\-./]+\.md)`")
for path in [ROOT / "SKILL.md"] + sorted((ROOT / "references").glob("*.md")):
    missing = sorted(
        {ref for ref in PATH_REF.findall(path.read_text()) if not (ROOT / ref).is_file()}
    )
    check(
        f"internal paths resolve: {path.relative_to(ROOT)}",
        not missing,
        f"dead reference(s): {', '.join(missing)}",
    )

# 5. Variable Reference table matches actual {{VAR}} usage in assets, both ways.
documented = set(re.findall(r"^\| `\{\{([A-Z][A-Z0-9_]*)\}\}`", skill_text, re.M))
used = set()
for path in asset_files():
    used |= {
        name
        for name in re.findall(r"\{\{([A-Z][A-Z0-9_]*)\}\}", path.read_text())
        if not name.startswith("IF_")
    }
check(
    "variable table covers all used variables",
    used <= documented,
    f"used but undocumented: {', '.join(sorted(used - documented))}",
)
check(
    "variable table lists no unused variables",
    documented <= used,
    f"documented but unused: {', '.join(sorted(documented - used))}",
)

# 6. Asset inventory matches the structure AGENTS.md and SKILL.md advertise.
EXPECTED = {
    "assets/templates/memory": 5,
    "assets/templates/instructions": 7,
    "assets/skills": 4,
}
for folder, count in EXPECTED.items():
    actual = len(list((ROOT / folder).glob("*.md")))
    check(f"{folder} holds {count} files", actual == count, f"found {actual}")
for single in [
    "assets/templates/protocol.md",
    "assets/templates/tasks-board.md",
    "assets/templates/onboarding-progress.md",
]:
    check(f"{single} exists", (ROOT / single).is_file(), "missing")

if errors:
    print(f"\n{len(errors)} check(s) failed")
    sys.exit(1)
print("\nAll structural checks passed")
