# Client Instructions

Per-client loading matrix, injection vs fetch, and generation guide. Read this
before Phase 7 (Client Setup) of the onboarding interview.

## Loading Matrix

Each AI client loads instruction files differently. This matrix determines
what format to generate and where to place it.

| Client | Instruction file | Format | @-imports | Placement |
|---|---|---|---|---|
| Claude Code (local) | `~/.claude/CLAUDE.md` (global) + project `CLAUDE.md` | Physical markdown | Yes (expand) | Write to disk |
| Claude Code (cloud) | Repo `CLAUDE.md` | Physical markdown | Repo-relative only | Committed to repo |
| Cowork (Claude Desktop) | Global Instructions field + project folder `CLAUDE.md` | Paste block + file | No (literal text) | Paste + write |
| claude.ai / mobile chat | Custom Instructions | Paste block | No | Paste into settings |
| Perplexity | Project Instructions | Paste block | No | Paste into project |
| Cursor | `.cursor/rules/` or `.cursorrules` | Physical markdown | File-based | Write to disk |
| GitHub Copilot | `.github/copilot-instructions.md` | Physical markdown | N/A | Write to repo |

## Two Load-Bearing Principles

### 1. Injection over fetch

Physical text in an instruction file that gets automatically loaded (injected)
is more reliable than telling the agent to "go read this file." Agents that
have to fetch instructions often skip, forget, or partially read.

For every client, maximize what gets injected and minimize what requires a
directed read.

### 2. Only Claude Code local expands @-imports

The `@path` syntax (e.g., `@AGENTS.md`, `@~/Vault/PROTOCOL.md`) only works in
local Claude Code sessions. Every other surface — Cowork, claude.ai, cloud
sessions, Perplexity, Cursor, Copilot — treats `@path` as literal text.

**Consequence:** any instruction content that needs to work across surfaces
must be physical text in the instruction file, not an import reference.

## Per-Client Generation Guide

### Claude Code (local)

**Global file:** `~/.claude/CLAUDE.md`

This loads in every Claude Code session regardless of working directory. It
carries:
- User identity and timezone
- Vault path and structure map
- Session protocol (physical text)
- Vault conventions
- Memory system description (if enabled)
- `@AGENTS.md` import for repo-specific conventions (when in a code repo)

**Project file:** `CLAUDE.md` or `CLAUDE.local.md` in the project root

Per-project files carry:
- Last Session pointer
- Session History table (last 15 entries)
- File map (project-specific structure)
- Extension point stubs (Agent Role, Session Start/End Extensions, Agent
  Operations, Response Style)
- Key Docs section

**Template variables for Claude Code:**
- `{{USER_NAME}}`, `{{USER_TIMEZONE}}` — identity
- `{{VAULT_PATH}}` — vault location
- `{{PROTOCOL_BODY}}` — full protocol text (not a pointer)
- `{{VAULT_CONVENTIONS}}` — tags, linking, frontmatter, escapes
- `{{#IF_MEMORY}}` block — memory system description (kept only when memory
  is enabled)
- `{{#IF_BOARDS}}` block — task board conventions (kept only when boards are
  enabled)

### Cowork (Claude Desktop)

**Global Instructions:** paste block in the Cowork settings

The Global Instructions field is pasted text — no file reference, no imports.
It carries the same content as the Claude Code global file but as a
self-contained paste block.

**Project folder CLAUDE.md:** the project's CLAUDE.md in the bound folder

Cowork injects the bound folder's CLAUDE.md automatically (verified behavior).
This carries per-project content: role, extensions, session pointer, file map.

**Important Cowork behaviors:**
- `@`-imports do NOT expand — they appear as literal text
- The vault-root CLAUDE.md does NOT load (no parent-walk)
- The user-level `~/.claude/CLAUDE.md` does NOT inject live
- Global Instructions is the only reliable global injection surface

### claude.ai / mobile chat

**Requires vault-cortex.** claude.ai chat has no local file access — without
vault-cortex the agent cannot read or write vault files, so this surface is
skipped during onboarding (Phase 7's vault-cortex gate). The guidance below
assumes vault-cortex is connected.

**Custom Instructions:** paste block in claude.ai settings

Single paste surface — everything in one block. Keep it concise (Custom
Instructions has a character limit). Prioritize:
1. Identity and timezone
2. Communication preferences
3. Protocol pointer (not full protocol — too long for this surface)
4. Memory summary (if enabled)

For sessions that need the full protocol, include a note: "For full session
protocol, read PROTOCOL.md in the vault."

### Perplexity

**Project Instructions:** paste block in project settings

Combined file — protocol + identity + project context in one block. Perplexity
has no global instruction surface, so each project carries everything.

Keep it focused — Perplexity sessions tend to be shorter and more research-
oriented. Emphasize identity and communication preferences over full protocol.

### Cursor

**Rules file:** `.cursor/rules/` directory or `.cursorrules` in project root

Physical markdown file. Cursor reads rules files automatically for each
project. Carries:
- Identity and timezone
- Communication preferences
- Project-specific conventions
- Vault structure reference

Cursor's rules system is file-based, so this is a write-to-disk operation,
not a paste.

### GitHub Copilot

**Instructions file:** `.github/copilot-instructions.md` in the repo

Committed to the repository. Carries project-specific conventions and
preferences. Keep it lean — Copilot instructions should focus on code
conventions, not vault operations.

## Conditional Content Assembly

Instruction files are assembled from blocks that map to onboarding decisions:

| Block | Included when |
|---|---|
| Identity (name, timezone) | Always |
| Communication preferences | Always |
| Vault path and structure map | Always |
| Vault conventions (tags, links, frontmatter) | Phase 3 = yes |
| Memory system description | Phase 4 = yes |
| Task board conventions | Phase 5 = yes |
| Session protocol | Phase 6 = yes |
| Extension point stubs | Phase 6 = full |

Blocks that aren't included are removed entirely — no empty sections or "not
configured" placeholders.

## Paste-Block Formatting

For paste-only surfaces (Cowork, claude.ai, Perplexity), format output as:

```
═══════════════════════════════════════════
PASTE THE FOLLOWING INTO [location]:
═══════════════════════════════════════════

[instruction content here]

═══════════════════════════════════════════
END OF PASTE BLOCK
═══════════════════════════════════════════
```

Tell the user exactly where to paste and what to expect after pasting.
