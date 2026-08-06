# Repository Guidelines

This file provides guidance to Claude Code (claude.ai/code), Codex CLI, and other AI agents when working with code in this repository.

## Project Overview

`vault-onboarding` is an Agent Skills-standard onboarding skill that bootstraps an agent collaboration system into an Obsidian vault. It runs a branching conversational interview and scaffolds memory files, session protocols, task boards, generated skills, and per-client instruction files — all tailored to the user's setup and needs.

Distribution: `npx skills add aliasunder/vault-onboarding`.

## Repository Structure

```
vault-onboarding/
  README.md
  SKILL.md                           # Interview flow + generation orchestration
  references/                        # 7 best-practice reference files (loaded on demand)
    vault-organization.md            #   Folder taxonomy, tags, linking, schemas
    memory-system.md                 #   Three-layer model, entry policies, growth
    protocol-guide.md                #   Session protocol, board conventions
    client-instructions.md           #   Per-client loading matrix
    generated-skills-guide.md        #   Skill parameterization
    progressive-adoption.md          #   Adoption tiers, evolution paths
    setup-verification.md            #   Per-client verification
  assets/                            # 19 asset files (15 templates + 4 skills)
    templates/memory/                #   5 About Me/ templates
    templates/instructions/          #   7 client-specific instruction templates
    templates/protocol.md            #   Genericized session protocol
    templates/tasks-board.md         #   5-lane Kanban
    templates/onboarding-progress.md #   Checkpoint file
    skills/                          #   4 generated skill templates
      session-start.md
      session-end.md
      remember.md
      project-role.md
  scripts/
    validate-structure.py            # Structural coherence checks (run by CI)
  .github/workflows/validate.yml     # Runs the structural checks on PR + push
```

## Skill Architecture

The skill follows the Agent Skills standard (`agentskills.io`). SKILL.md has YAML frontmatter with `name` and `description`, plus the interview flow and generation orchestration in the body.

Reference files (`references/*.md`) are loaded on demand — only when the agent enters a phase that needs them. This keeps the core SKILL.md lean while having deep guidance available.

Asset templates (`assets/`) are literal markdown files with `{{VARIABLE}}` markers. The agent reads, substitutes, writes.

## Development Guidelines

- No build system or package manager — skills are markdown files (`package.json` exists only for version tracking)
- All template files use `{{VARIABLE}}` markers for substitution
- Generated skills are triggers, not copies — they say "follow the protocol in your instruction file"
- The SKILL.md itself uses only native file tools (Read, Write, Bash) — vault-cortex MCP tools only appear in GENERATED artifacts
- Interview questions use plain language accessible to non-technical users

## Adding a reference file

1. Create `references/my-reference.md`
2. Add a pointer in SKILL.md's "How This Skill Works" section with path, description, and bold trigger condition
3. Reference from the appropriate interview phase
