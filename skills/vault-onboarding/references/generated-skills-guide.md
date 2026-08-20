# Generated Skills Guide

How the onboarding skill generates session-start, session-end, remember, and
project-role skills. Read this during Phase 6 (Protocol) when generating
skills.

## The Trigger-Skill Pattern

Generated skills are **triggers, not copies**. The protocol lives in the
user's instruction files — skills just say "follow the protocol." This means:

- Protocol updates only touch instruction files (one place)
- Skills don't duplicate protocol content
- Skills can be short and focused on pitfalls and tool guidance

A trigger skill has three parts:

1. **"What to do"** — a one-line directive pointing to where the protocol lives
2. **Tool guidance** — which tools to use (vault-cortex or native)
3. **Common pitfalls** — mistakes agents make when following the protocol

### Skill frontmatter

```yaml
---
name: skill-name
description: >
  One-paragraph description. Use when [trigger phrases]. NOT for: [exclusions].
---
```

The `description` field controls when the skill fires. Include:
- Trigger phrases the user might say
- Situations where it should activate automatically
- Explicit exclusions to prevent false triggers

## Skill Education

Before generating skills in Phase 6, the model must explain what a skill IS
and what each one does. This education block runs before any files are written
— the user should understand the concept before seeing the artifacts.

### What a skill is (scripted by comfort level)

**Non-technical:**

> "Before I create these tools, let me explain what they are. A **skill** is
> like a recipe card for your AI. When you say a specific phrase — like 'start
> a session' — the AI recognizes it and follows the recipe: it checks what
> happened last time, looks at your tasks, and gives you a summary. You don't
> need to remember the steps; you just say the phrase and the AI does the rest."

**Technical:**

> "Skills are trigger-action scripts — declarative instructions that fire when
> you say a trigger phrase. They define what to do; the AI adapts the how
> based on available tools. Think of them as named procedures the AI follows
> instead of improvising."

### Per-skill introduction

After the general explanation, introduce each skill being generated. For each
one, state:

- **Name**: what it's called
- **What it does**: one sentence, plain language
- **Trigger phrases**: how the user activates it (primary phrase + alternatives)
- **Example**: a concrete scenario

Template (adapt each description to what was scaffolded — include the
bracketed clauses only when that component was enabled):

> "**session-start** — Catches you up at the beginning of a work session. Say
> 'start a session', 'catch me up', or 'what's on deck'. The AI reads your
> last session's handoff, [if boards:] checks your task board, and summarizes
> where you left off."
>
> "**session-end** — Wraps up and saves a handoff for next time. Say 'end
> session', 'wrap up', or 'close out'. The AI writes a session log[, if
> boards + full protocol: updates your tasks][, if memory + full protocol:
> and saves anything worth remembering]."
>
> "**remember** — Saves a preference or fact to your memory files. Say
> 'remember that I prefer X' or 'save this for later'. The AI proposes an
> entry, you approve it, and it's saved — you'll never need to explain it
> again."
>
> "**project-role** — Defines how AI should behave in a specific project. Say
> 'set up this project' or 'define the agent role'. The AI asks a few
> questions and writes the role into the project's instruction file."

List all skills being generated before writing any files. The user should see
the complete set and understand each one before the first is created.

### Post-generation confirmation

After all skills are generated and delivered, confirm with a trigger-phrase
summary. **List only the skills that were generated** — the set depends on
what was scaffolded (session skills if protocol enabled, remember if memory
enabled, project-role if full protocol):

> "Those are set up. Here's the cheat sheet — these are the phrases you can
> use from now on:
>
> [Include only the lines for skills that were generated:]
> - 'start a session' — picks up where you left off [if protocol]
> - 'end session' — saves everything and writes the handoff [if protocol]
> - 'remember that...' — saves a preference or fact [if memory]
> - 'set up this project' — defines a project's agent role [if full protocol]
>
> You don't need to memorize these exactly — the AI recognizes natural
> variations. 'Catch me up' works the same as 'start a session.'"

## Skill Parameterization

Each generated skill adapts to what was scaffolded. Variables control which
sections and tool references are included.

### session-start

**Always included:**
- Read instruction files
- Read the last session log
- Summarize and recommend focus

**Conditional:**
- List open tasks (if boards enabled — `{{#IF_BOARDS}}` block)
- Ground in memory (if memory enabled — `{{#IF_MEMORY}}` block)
- Run extensions (if full protocol — `{{#IF_FULL_PROTOCOL}}` block)

**Tool references adapt via `{{#IF_VAULT_CORTEX}}` / `{{^IF_VAULT_CORTEX}}`
blocks:**
- With: `vault_list_tasks`, `vault_get_memory`, `vault_memory_recall`
- Without: direct file reads, grep for tasks

### session-end

**Always included:**
- Write session log
- Update Last Session pointer

**Conditional:**
- Reconcile task boards (if boards enabled AND full protocol)
- Review memory for new entries (if memory enabled AND full protocol)
- Run extensions (if full protocol)
- Output completion summary

**Tool references adapt similarly.**

**Lightweight note:** memory review and board reconciliation at session end
are full-protocol-only. When generating session-end for a lightweight
protocol, treat the template's `{{#IF_MEMORY}}` and `{{#IF_BOARDS}}` blocks
as false even if memory or boards are enabled — memory entries flow through
the remember skill instead, and boards are not auto-reconciled at session end.

### remember

**Only generated if memory is enabled (Phase 4 = yes).**

The remember skill handles the "remember this" workflow:

1. Determine which memory file the entry belongs in (routing test using scope
   callouts)
2. Check for duplicates (has this already been captured?)
3. Propose the entry with file, section, date, and text
4. Wait for user approval
5. Write the entry

**Tool adaptation:**
- With vault-cortex: `vault_memory_recall` for duplicate check,
  `vault_update_memory` for writing
- Without: grep the target file, append a dated bullet

### project-role

**Only generated if full protocol is enabled (Phase 6 = full).**

The project-role skill helps define per-project agent roles:

1. Ask what the project is about
2. Ask what role agents should play
3. Ask for domain-specific context and behavioral preferences
4. Compose an `## Agent Role` section
5. Inject it into the project's instruction file at the extension stub

This closes the loop on the empty extension stubs the onboarding creates.

## Standalone vs vault-cortex

Generated skills branch on vault-cortex availability. The detection happens
during onboarding (Phase 6) and is baked into the generated skill text.

### With vault-cortex

Skills reference MCP tools:
```text
vault_read_note     — read notes and session logs
vault_list_tasks    — list tasks with structured data
vault_update_task   — complete tasks atomically
vault_get_memory    — read memory by file and section
vault_memory_recall — semantic search across memory
vault_write_note    — create session logs
vault_search        — find notes by content or metadata
```

Skills also include a reminder to load tool schemas via ToolSearch if the tools
are deferred.

### Without vault-cortex

Skills reference native file tools:
```text
Read                — read notes and session logs
Write               — create session logs
Bash (grep)         — search for content
Bash (append)       — add entries to files
```

The logic is the same — only the tool names change.

## Skill Placement

**Vault copy first, always:** every generated skill is written into the
user's vault (`Setup/skills/<name>.md` or the folder the user prefers)
regardless of client. The vault copy survives the session, syncs, and is the
source to re-deliver from if a client's copy is lost or a new client is
added later.

Then deliver to each client the user selected:

| Client | Skill location | Method |
|---|---|---|
| Claude Code | `~/.claude/skills/<name>/SKILL.md` | Write to disk |
| Agent Skills standard | `~/.agents/skills/<name>/SKILL.md` | Write to disk |
| Perplexity | Personal skill library | Save via the client's own skill-save path (an agent running in Perplexity can save directly). `npx skills add` does NOT apply; for third-party skills, the user adds a release zip from the skill's GitHub releases |
| claude.ai / Claude Desktop | Uploaded skill | Emit the skill as an uploadable file and point the user at the skills upload surface |
| Cowork | Output content for user to add | Display to user |
| No skill mechanism | That client's instruction block | Fold the skill's trigger behavior into the instruction file generated in Phase 7 |

For Claude Code users, check if `~/.claude/skills/` exists. If not, check
`~/.agents/skills/`. Create the directory structure if needed.

Skills installed via `npx skills add` go to `~/.agents/skills/`. Skills
created locally go to `~/.claude/skills/`. Both locations work — Claude Code
scans both.

**Delivery verification:** delivery is complete only when the onboarding
checkpoint records each skill with its destination per client (or an
explicit skip reason). A skill that was generated but never reached a client
— with nothing recorded — is a dropped deliverable, and the Phase 8
completion checklist must surface it.

## Pitfall Documentation

Each generated skill includes a "Common pitfalls" section with mistakes agents
make. Pitfalls are conditional — only include pitfalls relevant to what was
scaffolded:

**Board pitfalls** (if boards enabled):
- Reading TASKS.md as raw markdown instead of using structured task tools
- Marking new cards as in-progress — creating ≠ starting work
- Treating a `[/]` card as available without checking if another agent owns it
- Loading Someday items at session start when they're rarely actionable

**Memory pitfalls** (if memory enabled):
- Dumping all memory at once instead of targeted reads
- Skipping the duplicate check before proposing entries
- Writing memory without user approval
- Routing entries to the wrong file (ignoring scope callouts)

**Protocol pitfalls** (always, if protocol enabled):
- Forgetting to read the last session's Open Items and Next Session
- Skipping the completion summary at session end
- Writing the session log to the wrong folder
