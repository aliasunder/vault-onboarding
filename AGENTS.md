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

<!-- distilled from vault Reference/code-standards-* on 2026-11-03; refresh (merges, keeps hand edits): run the sync-code-standards skill -->

This repo is primarily markdown (SKILL.md, references, templates, README) with TypeScript in `scripts/`. Docs standards apply everywhere; TS and comment standards apply to `scripts/`. There is no test suite; CI runs `scripts/validate-structure.ts`.

### Writing (all files)

**Format decision at write time** — before committing any prose:
1. Information (a setting's behavior, a list of options) → structured format (table, bullets, numbered steps). Narrative → PR description, not committed files.
2. More than 3 sentences of prose? → wrong format. Pick what the reader absorbs quickest — table for lookups, bullets for parallel items, numbered list for steps. Multi-paragraph "breakdowns" are still prose.
3. A section far longer than its siblings is a blob even when each sentence is fine. Read the neighbors first.
4. One idea per sentence; one action per step. A new requirement bolted onto an existing step becomes its own step.

**The authoring test** — line-level fact-checking cannot validate a document. For each reader the doc serves (a non-technical vault owner, an agent following SKILL.md), walk the whole artifact: sentence, placement, format, sibling contradictions, purpose. After editing one section, re-read the whole document, not the diff.

**Language:**
- Plain-first — jargon with real signal stays with a one-line gloss; plain words get no gloss; session shorthand and coined group names never ship. Test: would the reader know what it means without looking anything up?
- Factual claims match the implementation — capability lists verified against the templates and scripts; conditional capabilities stated conditionally.
- Mechanism language is earned — "caches", "batches", "switches automatically" only when the code does that, not merely the outcome.
- Describe what the feature does, not why someone would use it. Procedure copy opens with the reader's motive ("To add a client, …"), not the operation's name.
- Concrete referents at the point of use — state the specific name where the reader is (`onboarding-progress.md`, not "the checkpoint file" paragraphs away). A definite noun must have been introduced first.
- No implicit contrasts or empty intensifiers — state the capability affirmatively.
- Troubleshooting entries end in numbered steps the reader can take, with a safe fallback, never in a diagnosis alone.
- A destructive-outcome claim pairs with its recovery path in the same sentence or table cell, on every surface that makes the claim.
- Setting and variable references (a `{{VARIABLE}}` table, a README option) state the knob, its effect, and its limits, with `Valid values:` and `Default:` on their own labelled lines.
- Defensive copy ("use at your own risk") enters a public doc only after the problem it guards against has occurred.
- Reviewed copy usually has a job — before cutting a "redundant" line, check why it exists; replace only the clause a change made stale.
- Prerequisites follow the reader — lead with the one install the audience needs, with a link; demote developer conveniences to an "already have it?" aside.
- No blobs. No filler lead-ins. Configuration guidance is a lookup table (situation → setting → outcome).

**Multi-path docs** — when a doc offers more than one install or client path:
- Every operational section serves every path, or scopes itself explicitly.
- Never reference a path the doc doesn't offer.
- Resource identifiers stay compatible across methods, or the doc says the methods are not interchangeable.
- A note that applies to all paths attaches to none of them.

**Lockstep** — docs update in the same change that alters behavior:
- Adding a reference, template, or client means sweeping every surface that enumerates its siblings: the structure tree above, SKILL.md's pointer list, the README.
- A derived artifact (the social-preview PNG) is regenerated in the same change.
- Generator guidance holds structure only; the claims live in the canonical doc the generator reads.

**Restructuring:**
- A structural self-reference ("shown below", "the section above") must resolve against the current document.
- Sibling docs (the per-client instruction templates) are authored as a set, with the same lead method and section skeleton, diverging only where the client genuinely differs.
- A feature spanning several docs gets one conceptual home; every other mention points to it.

### Comments (TypeScript in scripts/)

**Write-time decision:**
1. Can a reader understand the function from name + params + return type? → **No comment.** Most functions.
2. Something non-obvious? → One-line JSDoc stating the constraint the signature doesn't convey.
3. Does the JSDoc restate the function name? → **Delete it.** Explains *what* instead of *why*? → rewrite as the constraint.
4. More than 2 lines? → Pick the format the reader absorbs quickest (bullets, numbered steps) — never multi-paragraph prose.

**Inline comments at the relevant line, not everything in the docstring.** The docstring states the outward contract; line-level concerns go above the line they explain.
- A guard or branch comment states the scenario, the mechanism, and what breaks without it.
- A chosen number (a timeout, a pinned browser build, a cap) gets its why directly above it; a fixed fact needs none.
- Regex constants get a comment.

**Comment content:**
- Short complete sentences, with no colon-hinged labels and no verbless fragments.
- Durable rationale only, never transition history, decision narrative, or operator internals. A genuine risk of retracing an abandoned error counts as rationale.
- OSS boundary: no issue/PR numbers, incident dates, deployment names, or task-board IDs in any public artifact.

### TypeScript (scripts/ only)

- No semicolons. Arrow `const`s over `function` declarations; leaf helpers before their callers.
- `const` by default; no unjustified `let`. Never disguise mutation as a fold (`reduce` with `acc.push()`); a helper never mutates its inputs and types collection params as readonly views. Readability gates all refactors.
- Early return from the simpler branch; block bodies for multiline responses. Never a chained ternary or a `let` assigned through if/else branches — one `if … return` per branch, or one named const per step.
- Named params when a positional call hides roles (an object above two args, adjacent same-typed args). A boolean mode param means the function does two things — split it.
- Named constants over bare magic literals (modes, sizes, dimensions), with the one-line why at the definition, scoped to where they are used.
- `type` over `interface`. Truthy/falsy checks over explicit comparisons unless 0/empty/false are valid. `Boolean(x)` over `!!x`.
- `as` and `!` are the same sin — runtime guards or type-guard functions instead. Model states in the type system: a result with modes is a discriminated union, branched with an exhaustive `switch`, never an `if` plus a ternary whose fallback catches the rest unnamed.
- Values named for what they ARE (no single letters or abbreviations); functions named for their point; booleans named for the affirmative state.
- Platform built-ins before hand-rolled parsing (`URL.parse`, `node:path`); exact-value comparison before regex; a doc-commented regex with named groups only when values genuinely vary.
- Per-operation try/catch — each catch encloses one operation with one failure meaning; broad catch-alls are banned. Every catch logs or re-throws; a swallowed error is worse than an uncaught one. Throw on an unreachable null, never a `?? ""` sentinel.
- File and process work uses Node built-ins (`node:fs`, `node:path`, `node:child_process`), with `fs/promises` where file modes or an atomic rename matter. Never Bun-only APIs (`Bun.Glob`, `Bun.spawn`, `Bun.$`), because CI and the `render:social-preview` npm script run these scripts under Node 24's type stripping.
- Standalone scripts are `.ts`, erasable syntax (no enums/namespaces).
