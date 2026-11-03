# Repository Guidelines

This file provides guidance to Claude Code (claude.ai/code), Codex CLI, and other AI agents when working with code in this repository.

## Project Overview

`vault-onboarding` is an onboarding skill in the Agent Skills format (see Skill Architecture) that bootstraps an agent collaboration system into an Obsidian vault. It runs a branching conversational interview and scaffolds memory files, a session protocol (the steps an agent runs at the start and end of each work session), task boards, generated skills, and instruction files for each AI client the user works in (Claude Code, Cursor, claude.ai, and others; Claude Code, Cowork and Perplexity each get a global file plus a per-project one) — all tailored to the user's setup and needs.

Distribution: `npx skills add aliasunder/vault-onboarding`.

## Repository Structure

```
vault-onboarding/
  README.md
  skills/vault-onboarding/             # The installable skill payload — everything under
                                       # here (and only this) ships via `npx skills add`
    SKILL.md                           # Interview flow + generation orchestration
    references/                        # Best-practice reference files (loaded on demand)
      vault-organization.md            #   Folder taxonomy, tags, linking, schemas
      memory-system.md                 #   Three-layer model, entry policies, growth
      protocol-guide.md                #   Session protocol, board conventions
      client-instructions.md           #   Per-client loading matrix
      generated-skills-guide.md        #   Skill parameterization
      progressive-adoption.md          #   Adoption tiers, evolution paths
      setup-verification.md            #   Per-client verification
    assets/                            # Templates the agent fills in and writes to the vault
      templates/memory/                #   5 About Me/ templates
      templates/instructions/          #   8 client-specific instruction templates
      templates/protocol.md            #   Genericized session protocol
      templates/tasks-board.md         #   5-lane Kanban
      templates/onboarding-progress.md #   Checkpoint file
      skills/                          #   Generated skill templates
        session-start.md
        session-end.md
        remember.md
        project-role.md
  scripts/
    validate-structure.ts            # Structural coherence checks (run by CI)
    render-social-preview.ts         # Renders social-preview.svg → .png via Puppeteer
  .github/workflows/
    validate.yml                     # Runs the structural checks on PRs + pushes to main
    umm_review.yml                   # Runs the umm-actually PR review bot
    manual_release.yml               # Releases: bump, tag, zip, GitHub release (see CONTRIBUTING.md)
    auto_release.yml                 # Releases from a v* tag push (see CONTRIBUTING.md)
  .github/social-preview.svg + .png  # Repo social card (SVG source + committed render)
  .github/fonts/                     # Fonts embedded by the render script
```

## Skill Architecture

The skill follows the Agent Skills standard (`agentskills.io`) and lives entirely under `skills/vault-onboarding/` — the directory the skills CLI discovers and installs, keeping repo tooling (`scripts/`, `.github/`, package files) out of the installed payload. SKILL.md has YAML frontmatter with `name` and `description`, plus the interview flow and generation orchestration in the body.

Reference files (`references/*.md`) are loaded on demand — only when the agent enters a phase that needs them. This keeps the core SKILL.md lean while having deep guidance available.

Asset templates (`assets/`) are literal markdown files with `{{VARIABLE}}` markers. The agent reads a template, keeps or drops each `{{#IF_X}}` conditional block, replaces each remaining marker with the user's interview answer or a computed value (SKILL.md's "Variable Reference" table names each variable's source), and writes the result into the user's vault.

## Development Guidelines

- No build step — the skill itself is pure markdown and installs with no dependencies; `devDependencies` cover repo tooling only (bun-managed, `bun.lock`)
- `scripts/` holds TypeScript that runs directly under Bun or Node: `bun run validate` runs `scripts/validate-structure.ts` under Bun locally, while CI runs the same file with `node` on Node 24, which strips the types, and the `render:social-preview` package script runs `scripts/render-social-preview.ts` with `node`
- All template files use `{{VARIABLE}}` markers for substitution
- Generated skills are triggers, not copies — session-start and session-end each tell the agent to follow the session protocol in the client's instruction file (`CLAUDE.md`, Global Instructions, or the client's equivalent), so the protocol text lives in one place
- The SKILL.md itself uses only the client's built-in file tools (Read, Write, Bash). Tools from the optional vault-cortex MCP server (`vault_*`, for remote vault access and search) appear only in GENERATED artifacts, and only when the user has vault-cortex connected
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
That `package.json` script installs the Chrome for Testing build that the
`puppeteer` version pinned in `package.json` expects, then runs
`scripts/render-social-preview.ts` with `node`. The render embeds JetBrains
Mono SemiBold (wordmark) and DejaVu Sans (body text) through `@font-face` for
deterministic rendering regardless of host system fonts. No browser downloads
at install time: `bun install` and npm both run puppeteer's postinstall
script (puppeteer is on Bun's default list of trusted dependencies), and the
`puppeteer.skipDownload` key in `package.json` makes that script skip the
download.

**Design family:** the card follows the social card of the sibling repo
[aliasunder/vault-cortex](https://github.com/aliasunder/vault-cortex) (a dark
tile with glowing nodes) and swaps its colors, with violet as the primary
color and cyan as the accent.

## Adding a reference file

1. Create `skills/vault-onboarding/references/my-reference.md`
2. Add a bullet to the **Reference files** list in SKILL.md's "How This Skill Works" section: the path, a one-line description, and a bold sentence saying when to read it (for example **Read before Phase 4 (Memory).**)
3. In each SKILL.md interview phase whose questions or generation steps use the file, add a bold line at the top of the phase: **Read `references/my-reference.md` before this phase.** When only one step of the phase uses the file, name that step instead, as Phase 6 does: **Read `references/generated-skills-guide.md` during skill generation.**
4. Add the file to the `references/` list in this file's Repository Structure tree, and update the reference-file count and list in README.md's Status section

## Code standards

<!-- distilled from vault Reference/code-standards-* on 2026-11-03; refresh (merges, keeps hand edits): run the sync-code-standards skill -->

This repo is primarily markdown (SKILL.md, references, templates, README) with TypeScript in `scripts/`. Docs standards apply everywhere; TS and comment standards apply to `scripts/`. There is no test suite; CI runs `scripts/validate-structure.ts`.

### Writing (all files)

**Format decision at write time** — before committing any prose:
1. Information (a setting's behavior, a list of options) → structured format (table, bullets, numbered steps). Narrative (why a design was chosen, what a change replaced) → PR description, not committed files.
2. More than 3 sentences of prose? → probably the wrong format: past that length the reader cannot find their answer without reading the whole block. Pick what the reader absorbs quickest — table for lookups, bullets for parallel items, numbered list for steps. Splitting the prose into several short paragraphs does not change its format.
3. A section far longer than its siblings is a blob even when each sentence is fine. Read the neighbors first.
4. One idea per sentence; one action per step. A new requirement bolted onto an existing step becomes its own step.

**The authoring test** — line-level fact-checking cannot validate a document. For each reader the doc serves (a non-technical vault owner, an agent following SKILL.md), walk the whole artifact: sentence, placement, format, sibling contradictions, purpose. After editing one section, re-read the whole document, not the diff.

**Language:**
- Plain-first — jargon with real signal stays with a one-line gloss; plain words get no gloss. Terms an author coins while working (shorthand, an invented name for a group of items) never ship; name what the items do instead. Test: would the reader know what it means without looking anything up?
- Factual claims match the implementation — capability lists verified against the templates and scripts; conditional capabilities stated conditionally.
- Mechanism language is earned — "caches", "batches", "switches automatically" only when the code does that, not merely the outcome.
- Feature descriptions state what the feature does, not why someone would use it.
- Procedure copy (steps the reader follows) opens with the reader's motive ("To add a client, …"), not the operation's name.
- Concrete referents at the point of use — state the specific name where the reader is (`onboarding-progress.md`, not "the checkpoint file" paragraphs away). A definite noun must have been introduced first.
- No implicit contrasts or empty intensifiers — "not just developers" reads as a defense against a doubt nobody raised, and "**real** task management" implies a fake one. State the capability affirmatively.
- Troubleshooting entries end in numbered steps the reader can take, with a safe fallback, never in a diagnosis alone.
- A destructive-outcome claim pairs with its recovery path in the same sentence or table cell, on every surface that makes the claim.
- Setting references (a README option table, an env-file comment) state the knob, its effect, and its limits, with `Valid values:` and `Default:` on their own labelled lines. SKILL.md's Variable Reference table is not one: its rows are slots the agent fills, most with no default.
- Defensive copy ("use at your own risk") enters a public doc only after the problem it guards against has occurred.
- Reviewed copy usually has a job — before cutting a "redundant" line, check why it exists; replace only the clause a change made stale.
- Prerequisites follow the reader — lead with the one install the audience needs, with a link; demote developer conveniences to an "already have it?" aside.
- No blobs. No filler lead-ins. Configuration guidance is a lookup table (situation → setting → outcome).

**Multi-path docs** — when a doc offers more than one path to the same goal (setup steps that differ per client, or with and without vault-cortex):
- Every operational section serves every path, or scopes itself explicitly.
- Never reference a path the doc doesn't offer.
- Names that several paths create or read (vault folders, generated file paths) stay the same on every path, or the doc says the paths are not interchangeable.
- A note that applies to every path sits outside all of them. Placed inside one path's steps, it stays invisible to readers of the other paths.

**Lockstep** — docs update in the same change that alters behavior:
- Adding a reference, template, or client means sweeping every surface that enumerates its siblings, counts included. The known surfaces follow; grep the repo for an existing sibling's name to catch any others:
  - A reference file: the surfaces the "Adding a reference file" steps above name.
  - A template: the structure tree above, SKILL.md's **Asset templates** list, README.md, and the asset-inventory check in `scripts/validate-structure.ts`.
  - A client: its instruction template's surfaces (the template line above), SKILL.md's Phase 0 client options and Phase 7 template table, the client list at the top of README.md, and every per-client section or table in `references/`.
- A derived artifact (the social-preview PNG) is regenerated in the same change.
- Instructions that tell an agent how to generate files (SKILL.md's generation steps) hold structure only. Capability claims and explanation text live in the `references/` file the agent reads during that phase, so each claim is written once.

**Restructuring:**
- A structural self-reference ("shown below", "the section above") must resolve against the current document.
- Sibling docs (the per-client instruction templates) are authored as a set, with the same section order and the same recommended approach listed first, diverging only where the client genuinely differs.
- A feature spanning several docs gets one conceptual home; every other mention points to it.

### Comments (TypeScript in scripts/)

**Write-time decision:**
1. Can a reader understand the function from name + params + return type? → **No comment.** Most functions.
2. Something non-obvious? → One-line JSDoc stating the constraint the signature doesn't convey.
3. Does the JSDoc restate the function name? → **Delete it.** Explains *what* instead of *why*? → rewrite as the constraint.
4. More than 2 lines? → Pick the format the reader absorbs quickest (bullets, numbered steps) — never multi-paragraph prose.

**Inline comments at the relevant line, not everything in the docstring.** The docstring states the outward contract; line-level concerns go above the line they explain.
- A guard or branch comment states the scenario, the mechanism, and what breaks without it.
- A chosen number (a timeout, a pinned browser build, a cap) gets its why directly above it. A number an outside spec sets (the 1280×640 card size GitHub recommends) needs no comment.
- Regex constants get a comment.

**Comment content:**
- Short complete sentences. A comment never opens with a label and a colon (`// Fallback: cached copy`) and never uses verbless fragments.
- Durable rationale only, never transition history ("renamed from X"), decision narrative, or details of the maintainer's own machine or setup. A comment that stops a future editor from reintroducing an approach that already failed counts as durable rationale.
- OSS boundary: no issue/PR numbers, incident dates, deployment names, or task-board IDs in any public artifact.

### TypeScript (scripts/ only)

These rules govern new code. `scripts/validate-structure.ts` predates them (semicolons, `function` declarations); bring a file into line when a change already edits it, never in a sweep of its own.

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
- File and process work uses Node built-ins (`node:fs`, `node:path`, `node:child_process`). The synchronous `node:fs` calls are the default; use `fs/promises` where file modes or an atomic rename matter. Never Bun-only APIs (`Bun.Glob`, `Bun.spawn`, `Bun.$`), because Node runs every script in `scripts/` (see Development Guidelines).
- Scripts are `.ts` files with erasable syntax only (no enums or namespaces), because Node's type stripping deletes type annotations but cannot compile other TypeScript syntax.
