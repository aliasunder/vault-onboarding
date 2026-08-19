/**
 * Structural validation for the vault-onboarding skill.
 *
 * Checks the invariants that keep SKILL.md, references/, and assets/ coherent:
 * frontmatter keys, {{MARKER}} well-formedness, conditional-block nesting,
 * internal path resolution, variable-table/usage agreement, and asset counts.
 * Exits non-zero with a list of failures; prints PASS per check otherwise.
 *
 * Erasable TypeScript only — runs directly under Node 24+ (native type
 * stripping), bun, or tsx with no dependencies and no build step.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL_DIR = join(ROOT, "skills", "vault-onboarding");
const errors: string[] = [];

function check(label: string, ok: boolean, detail = ""): void {
  if (ok) {
    console.log(`PASS  ${label}`);
  } else {
    errors.push(`${label}: ${detail}`);
    console.log(`FAIL  ${label}: ${detail}`);
  }
}

function mdFilesUnder(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...mdFilesUnder(full));
    else if (entry.name.endsWith(".md")) found.push(full);
  }
  return found.sort();
}

const read = (path: string): string => readFileSync(path, "utf8");
const rel = (path: string): string => relative(ROOT, path);
const isFile = (path: string): boolean => existsSync(path) && statSync(path).isFile();

const assetFiles = mdFilesUnder(join(SKILL_DIR, "assets"));

// 1. SKILL.md frontmatter carries the Agent Skills required keys.
const skillText = read(join(SKILL_DIR, "SKILL.md"));
const frontmatter = skillText.match(/^---\n([\s\S]*?)\n---\n/);
check(
  "SKILL.md frontmatter has name + description",
  frontmatter !== null && /^name:/m.test(frontmatter[1]) && /^description:/m.test(frontmatter[1]),
  "missing frontmatter block or required keys",
);

// 2. Marker well-formedness: every line's {{ and }} counts agree.
const occurrences = (text: string, token: string): number => text.split(token).length - 1;
for (const path of [...assetFiles, join(SKILL_DIR, "SKILL.md")]) {
  const badLines = read(path)
    .split("\n")
    .flatMap((line, index) =>
      occurrences(line, "{{") !== occurrences(line, "}}") ? [String(index + 1)] : [],
    );
  check(
    `balanced marker braces: ${rel(path)}`,
    badLines.length === 0,
    `unbalanced {{ }} on line(s) ${badLines.join(", ")}`,
  );
}

// 3. Conditional nesting: {{#IF_X}} / {{^IF_X}} open, {{/IF_X}} closes the
//    innermost open block of the same name (block and inline forms alike).
const CONDITIONAL = /\{\{([#^/])(IF_[A-Z0-9_]+)\}\}/g;
for (const path of assetFiles) {
  const stack: Array<{ name: string; line: number }> = [];
  let problem: string | null = null;
  const lines = read(path).split("\n");
  outer: for (let i = 0; i < lines.length; i++) {
    for (const match of lines[i].matchAll(CONDITIONAL)) {
      const kind = match[1];
      const name = match[2];
      if (kind === "#" || kind === "^") {
        stack.push({ name, line: i + 1 });
      } else if (stack.pop()?.name !== name) {
        problem = `line ${i + 1}: {{/${name}}} has no matching open`;
        break outer;
      }
    }
  }
  if (problem === null && stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    problem = `unclosed ${unclosed.name} opened on line ${unclosed.line}`;
  }
  check(`conditional nesting: ${rel(path)}`, problem === null, problem ?? "");
}

// 4. Internal path references in SKILL.md and references/ resolve on disk.
const PATH_REF = /`((?:references|assets)\/[A-Za-z0-9_\-./]+\.md)`/g;
for (const path of [join(SKILL_DIR, "SKILL.md"), ...mdFilesUnder(join(SKILL_DIR, "references"))]) {
  const refs = [...read(path).matchAll(PATH_REF)].map((match) => match[1]);
  const missing = [...new Set(refs.filter((ref) => !isFile(join(SKILL_DIR, ref))))].sort();
  check(
    `internal paths resolve: ${rel(path)}`,
    missing.length === 0,
    `dead reference(s): ${missing.join(", ")}`,
  );
}

// 5. Variable Reference table matches actual {{VAR}} usage in assets, both ways.
const documented = new Set(
  [...skillText.matchAll(/^\| `\{\{([A-Z][A-Z0-9_]*)\}\}`/gm)].map((match) => match[1]),
);
const used = new Set<string>();
for (const path of assetFiles) {
  for (const match of read(path).matchAll(/\{\{([A-Z][A-Z0-9_]*)\}\}/g)) {
    if (!match[1].startsWith("IF_")) used.add(match[1]);
  }
}
const usedNotDocumented = [...used].filter((name) => !documented.has(name)).sort();
const documentedNotUsed = [...documented].filter((name) => !used.has(name)).sort();
check(
  "variable table covers all used variables",
  usedNotDocumented.length === 0,
  `used but undocumented: ${usedNotDocumented.join(", ")}`,
);
check(
  "variable table lists no unused variables",
  documentedNotUsed.length === 0,
  `documented but unused: ${documentedNotUsed.join(", ")}`,
);

// 6. Asset inventory matches the structure AGENTS.md and SKILL.md advertise.
const EXPECTED_COUNTS: Record<string, number> = {
  "assets/templates/memory": 5,
  "assets/templates/instructions": 8,
  "assets/skills": 4,
};
for (const [folder, expected] of Object.entries(EXPECTED_COUNTS)) {
  const actual = readdirSync(join(SKILL_DIR, folder)).filter((name) => name.endsWith(".md")).length;
  check(`${folder} holds ${expected} files`, actual === expected, `found ${actual}`);
}
for (const single of [
  "assets/templates/protocol.md",
  "assets/templates/tasks-board.md",
  "assets/templates/onboarding-progress.md",
]) {
  check(`${single} exists`, isFile(join(SKILL_DIR, single)), "missing");
}

// 7. Heading cross-references: quoted heading names paired with a backtick-quoted
//    reference-file path must resolve to an actual heading in the target file.
//    Catches heading renames that silently break navigation aids for agents.
const HEADING_XREF_A = /"([^"]+)"\s+(?:section\s+of|in)\s+`(references\/[A-Za-z0-9_\-./]+\.md)`/g;
const HEADING_XREF_B = /`(references\/[A-Za-z0-9_\-./]+\.md)`\s*→\s*"([^"]+)"/g;
// Unquoted Title-Case heading named as a table/section/walkthrough of the file,
// e.g. "per the Skill Placement table in `references/generated-skills-guide.md`".
const HEADING_XREF_C =
  /\b([A-Z][A-Za-z0-9'&-]*(?:\s+[A-Z][A-Za-z0-9'&-]*)*)\s+(?:table|section|walkthrough|list)\s+(?:in|of)\s+`(references\/[A-Za-z0-9_\-./]+\.md)`/g;
const xrefFiles = [join(SKILL_DIR, "SKILL.md"), ...mdFilesUnder(join(SKILL_DIR, "references"))];
for (const path of xrefFiles) {
  // Collapse line continuations so multi-line references match.
  const text = read(path).replace(/\s+/g, " ");
  const mismatches: string[] = [];
  const checkXref = (rawHeading: string, refFile: string): void => {
    const heading = rawHeading.replace(/\s+/g, " ").trim();
    const targetPath = join(SKILL_DIR, refFile);
    if (!isFile(targetPath)) return; // already caught by check 4
    const headings = read(targetPath)
      .split("\n")
      .filter((line) => /^#{1,6}\s/.test(line))
      .map((line) => line.replace(/^#{1,6}\s+/, "").trim());
    if (!headings.includes(heading)) {
      mismatches.push(`"${heading}" not found in ${refFile}`);
    }
  };
  // Pattern A: "Heading" section of / in `references/file.md`
  for (const match of text.matchAll(new RegExp(HEADING_XREF_A))) {
    checkXref(match[1], match[2]);
  }
  // Pattern B: `references/file.md` → "Heading"
  for (const match of text.matchAll(new RegExp(HEADING_XREF_B))) {
    checkXref(match[2], match[1]);
  }
  // Pattern C: Skill Placement table in `references/file.md` (unquoted).
  // A sentence-leading "The" is part of the prose, not the heading.
  for (const match of text.matchAll(new RegExp(HEADING_XREF_C))) {
    checkXref(match[1].replace(/^The\s+/, ""), match[2]);
  }
  check(
    `heading cross-refs resolve: ${rel(path)}`,
    mismatches.length === 0,
    mismatches.join("; "),
  );
}

if (errors.length > 0) {
  console.log(`\n${errors.length} check(s) failed`);
  process.exit(1);
}
console.log("\nAll structural checks passed");
