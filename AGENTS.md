# Repository Guidelines

This file provides guidance to Claude Code (claude.ai/code), Codex CLI, and other AI agents when working with code in this repository.

## Project Overview

`vault-onboarding` is an Agent Skills-standard onboarding skill that bootstraps an agent collaboration system into an Obsidian vault. It runs a branching conversational interview and scaffolds memory files, session protocols, task boards, generated skills, and per-client instruction files — all tailored to the user's setup and needs.

Distribution: `npx skills add aliasunder/vault-onboarding`.

## Repository Structure

```
vault-onboarding/
  README.md
  skills/vault-onboarding/             # The installable skill payload — everything under
                                       # here (and only this) ships via `npx skills add`
    SKILL.md                           # Interview flow + generation orchestration
    references/                        # 7 best-practice reference files (loaded on demand)
      vault-organization.md            #   Folder taxonomy, tags, linking, schemas
      memory-system.md                 #   Three-layer model, entry policies, growth
      protocol-guide.md                #   Session protocol, board conventions
      client-instructions.md           #   Per-client loading matrix
      generated-skills-guide.md        #   Skill parameterization
      progressive-adoption.md          #   Adoption tiers, evolution paths
      setup-verification.md            #   Per-client verification
    assets/                            # 20 asset files (16 templates + 4 skills)
      templates/memory/                #   5 About Me/ templates
      templates/instructions/          #   8 client-specific instruction templates
      templates/protocol.md            #   Genericized session protocol
      templates/tasks-board.md         #   5-lane Kanban
      templates/onboarding-progress.md #   Checkpoint file
      skills/                          #   4 generated skill templates
        session-start.md
        session-end.md
        remember.md
        project-role.md
  scripts/
    validate-structure.ts            # Structural coherence checks (run by CI)
    render-social-preview.ts         # Renders social-preview.svg → .png via Puppeteer
  .github/workflows/validate.yml     # Runs the structural checks on PR + push
  .github/social-preview.svg + .png  # Repo social card (SVG source + committed render)
  .github/fonts/                     # Fonts embedded by the render script
```

## Skill Architecture

The skill follows the Agent Skills standard (`agentskills.io`) and lives entirely under `skills/vault-onboarding/` — the directory the skills CLI discovers and installs, keeping repo tooling (`scripts/`, `.github/`, package files) out of the installed payload. SKILL.md has YAML frontmatter with `name` and `description`, plus the interview flow and generation orchestration in the body.

Reference files (`references/*.md`) are loaded on demand — only when the agent enters a phase that needs them. This keeps the core SKILL.md lean while having deep guidance available.

Asset templates (`assets/`) are literal markdown files with `{{VARIABLE}}` markers. The agent reads, substitutes, writes.

## Development Guidelines

- No build step — the skill itself is pure markdown and installs with no dependencies; `devDependencies` cover repo tooling only (bun-managed, `bun.lock`), and `scripts/` is runtime-agnostic TypeScript run directly (`bun run validate` locally; CI runs the same file with Node 24's type stripping)
- All template files use `{{VARIABLE}}` markers for substitution
- Generated skills are triggers, not copies — they say "follow the protocol in your instruction file"
- The SKILL.md itself uses only native file tools (Read, Write, Bash) — vault-cortex MCP tools only appear in GENERATED artifacts
- Interview questions use plain language accessible to non-technical users

## Social preview card

`.github/social-preview.svg` is the source; the committed `.png` is its
1280×640 render, uploaded manually under GitHub Settings → Social preview
(re-upload after changing the PNG — not automated). The card lives in
`.github/` deliberately — `skills/vault-onboarding/` is the installable
skill payload and must stay free of repo branding. Update the SVG when feature
categories change (the feature line is rendered in the image), then
regenerate the PNG.

**Regenerating `social-preview.png`:** Run `bun run render:social-preview`.
The script uses Puppeteer's pinned Chrome for Testing build with embedded
JetBrains Mono SemiBold (wordmark) and DejaVu Sans (body text) `@font-face`
for deterministic rendering regardless of host system fonts. No browser
downloads at install time — `bun install` skips postinstall scripts and the
`puppeteer.skipDownload` key covers npm installs; the script installs the
pinned browser on demand. Design family: matches vault-cortex's card (dark
tile, glow nodes) with an inverted violet-primary palette.

## Adding a reference file

1. Create `skills/vault-onboarding/references/my-reference.md`
2. Add a pointer in SKILL.md's "How This Skill Works" section with path, description, and bold trigger condition
3. Reference from the appropriate interview phase

## Code standards

<!-- distilled from vault Reference/code-standards-* on 2026-08-24; refresh: run the sync-code-standards skill -->

This repo is primarily markdown (SKILL.md, references, templates) with TypeScript in `scripts/`. Docs standards apply everywhere; TS standards apply to `scripts/`.

### Writing (all files)

**Format decision at write time** — before committing any prose:
1. Information (a setting's behavior, a list of options) → structured format (table, bullets, numbered steps). Narrative → PR description, not committed files.
2. More than 3 sentences of prose? → wrong format. Pick what the reader absorbs quickest — table for lookups, bullets for parallel items, numbered list for steps. Multi-paragraph "breakdowns" are still prose.
3. A section twice the length of its siblings is a blob even when each sentence is fine.
4. One idea per sentence; one action per step.

**Language:**
- Plain-first — jargon with real signal stays with a one-line gloss; session shorthand never ships. Test: would the reader know what it means without looking anything up?
- Factual claims match the implementation — capability lists verified against the code; conditional capabilities stated conditionally.
- Mechanism language is earned — "caches", "batches" only when the code does that, not merely the outcome.
- Describe what the feature does, not why someone would use it.
- Concrete referents at the point of use — state the specific name where the reader is, not "the file" paragraphs away.
- No blobs. No filler lead-ins.

**Multi-path docs** — when offering multiple install/setup methods: every operational section serves every path or scopes itself explicitly. Never reference a path the doc doesn't offer. Resource identifiers compatible across methods.

**Lockstep** — docs update in the same change that alters behavior. Sweep every surface that enumerates siblings when adding a concept.

**Restructuring** — structural self-references ("shown below", "the section above") must resolve against the current document. Sibling docs are authored as a set.

### Comments (TypeScript in scripts/)

**Write-time decision:**
1. Can a reader understand the function from name + params + return type? → **No comment.** Most functions.
2. Something non-obvious? → One-line JSDoc stating the constraint the signature doesn't convey.
3. Does the JSDoc restate the function name? → **Delete it.**
4. More than 2 lines? → Pick the format the reader absorbs quickest (bullets, numbered steps) — never multi-paragraph prose.

**Inline comments at the relevant line, not everything in the docstring.** The docstring states the outward contract; line-level concerns go above the line they explain.

Durable rationale only — never transition history or operator internals. OSS boundary: no issue/PR numbers, incident dates, deployment names, or task-board IDs in any public artifact.

### TypeScript (scripts/ only)

- No semicolons. Arrow `const`s over `function` declarations.
- `const` by default; no unjustified `let`. Readability gates all refactors.
- Early return from the simpler branch; block bodies for multiline responses.
- `type` over `interface`. Truthy/falsy checks over explicit comparisons unless 0/empty/false are valid.
- `as` and `!` are the same sin — runtime guards instead.
- Values named for what they ARE; functions named for their point.
- Standalone scripts are `.ts`, erasable syntax (no enums/namespaces).
