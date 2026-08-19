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
| Perplexity (global) | Global Instructions (AI Profile) | Paste block | No | Paste into settings |
| Perplexity (project) | Project Instructions | Paste block | No | Paste into project |
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

Perplexity has two instruction surfaces:

**Global Instructions:** accessible in Perplexity settings (Profile / AI
Profile). Carries identity, timezone, communication preferences, and vault
structure — everything that applies across all conversations, not just within a
project. Generated from `assets/templates/instructions/perplexity-global.md`.

**Project Instructions:** per-project settings. Carries project-specific
context, conventions, task board location, and protocol pointers. Combined with
global instructions in project conversations. Generated from
`assets/templates/instructions/perplexity.md`.

Generate both: paste the global block first (settings-level, applies
everywhere), then the per-project block (project-specific). The global surface
means identity and communication preferences only need to be set once, not
duplicated into every project.

Keep project instructions focused on project-specific context. Identity,
timezone, and communication preferences live in Global Instructions.

### Cursor

**Rules file:** `.cursor/rules/` directory or `.cursorrules` in project root

Physical markdown file. Cursor reads rules files automatically for each
project. Carries:
- Identity and timezone
- Communication preferences
- Project-specific conventions
- Vault structure reference
- Session protocol pointer (if protocol enabled)

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

## Per-Client Concept Education

Before generating each client's instruction file in Phase 7, explain what that
client's instruction mechanism IS in plain language. A user who understands what
they're configuring will maintain the system confidently. These scripts are
calibrated for non-technical users; adjust to technical comfort.

### Perplexity

> "A Perplexity **project** is like a workspace — it groups conversations
> around a topic and carries shared instructions. Any conversation you start
> in a project automatically gets those instructions, so the AI already knows
> who you are and what you're working on. You'll want to start vault-related
> conversations from this project.
>
> Perplexity also has **Global Instructions** in your profile settings. Those
> apply to every conversation, not just within a project — I'll put your
> identity and communication preferences there so Perplexity always knows who
> you are, even outside this project."

### Cowork (Claude Desktop)

> "Cowork has two instruction layers. **Global Instructions** are standing
> orders that apply to every conversation — your identity, preferences, and
> how you like to work. The **CLAUDE.md** file in a project folder carries
> project-specific context — Cowork reads it automatically when you bind that
> folder."

### Claude Code

> "Claude Code reads a file called **CLAUDE.md** automatically whenever it
> works in a folder. The global one (at ~/.claude/CLAUDE.md) carries your
> identity and preferences everywhere. A project's CLAUDE.md carries
> project-specific context — what it's about, what's active, where things
> are."

### claude.ai / mobile chat

> "Custom Instructions are your standing preferences — they apply to every
> conversation on claude.ai. Think of them as your default briefing to the
> AI."

### Cursor

> "Cursor reads rules files from your project directory automatically. They
> tell Cursor what conventions to follow when working on that project's
> code."

### GitHub Copilot

> "The copilot-instructions file lives in your repository and Copilot reads
> it for project conventions. It's committed alongside your code so everyone
> on the team gets the same instructions."

## Paste-Block Formatting

For paste-only surfaces (Cowork, claude.ai, Perplexity), format output as:

```text
═══════════════════════════════════════════
PASTE THE FOLLOWING INTO [location]:
═══════════════════════════════════════════

[instruction content here]

═══════════════════════════════════════════
END OF PASTE BLOCK
═══════════════════════════════════════════
```

Tell the user exactly where to paste and what to expect after pasting.

## Persisting Paste Blocks

Paste surfaces have no history: once the chat that produced a block is gone,
so is the source. Every paste block is therefore ALSO written into the
user's vault as a reference note — the chat delivery is a convenience copy,
the vault note is the record.

**Convention:**
- Path: `Reference/<client>-instructions.md` (e.g.
  `Reference/perplexity-instructions.md`,
  `Reference/cowork-global-instructions.md`)
- Frontmatter: `type: reference`, tags `[reference, agent-config, <client>]`
- Lead line naming the exact paste destination, e.g. "Copy/paste source for
  Perplexity → Project Settings → Project Instructions"
- Body: the paste block content verbatim

**Why it matters:** the vault note gets versioning via Obsidian Sync, is
editable from any surface (including remotely via vault-cortex), and is the
source of truth to re-paste from when anything changes. When the user later
edits conventions or the protocol, they update the vault note and re-paste —
no regeneration from scratch.

## vault-cortex Is Per-Client

vault-cortex is connected per surface — a working connection in the
onboarding session says nothing about the user's other clients. During Phase
7, record for each selected client whether vault-cortex is connected there
(ask the user; it cannot be detected remotely):

- **claude.ai chat:** required (the Phase 7 gate — skip the surface if
  absent)
- **Cowork, Perplexity, Cursor, Claude Code:** enhancement — instruction
  blocks reference `vault_*` tools only when the connection is confirmed for
  that client; otherwise reference native file tools
- **Wanted but not set up:** give the user setup pointers for that surface
  instead of assuming
