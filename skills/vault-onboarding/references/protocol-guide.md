# Protocol Guide

Session protocol anatomy, start/end sequences, board conventions, and
tool-layer adaptation. Read this before Phase 6 (Protocol) of the onboarding
interview.

## What the Protocol Does

The session protocol is a structured ritual for starting and ending work with
AI agents. It ensures:

- **Continuity** — agents know what happened last time without being told
- **Memory growth** — agents capture new preferences and facts every session
- **Task tracking** — boards stay current, completed work gets recorded
- **Handoff quality** — session logs bridge one conversation to the next

Without a protocol, each session starts cold. The user repeats context, agents
forget preferences, decisions get lost. The protocol solves this by defining
what agents read at the start and write at the end.

## Session Start Sequence

When a session begins, the agent follows these steps:

### 1. Read instruction files

The agent reads the project's instruction files to get:
- Agent role and domain context
- Vault conventions and structure
- Extension point content (if defined)

### 2. Read the last session log

Follow the "Last Session" pointer in the instruction file to find the most
recent session log. Read its "Open Items" and "Next Session" sections — these
are the continuity bridge.

### 3. List open tasks

If task boards are enabled, read the active tasks. Focus on Active, Up Next,
and Waiting On lanes. Skip Someday unless the user asks — it's often large and
rarely actionable at session start.

### 4. Ground in memory

If memory is enabled, read selectively — never dump all memory files at once.
The approach:

1. Survey the memory files to see what exists (file names, sections, entry
   counts).
2. Read core sections relevant to the session type.
3. Recall by topic once the session's focus is known.

### 5. Run extensions

If the project defines Session Start Extensions (full protocol only), run them.

### 6. Summarize and recommend

Output a brief summary (10-15 lines):
- Last session topic and date
- Active and upcoming tasks
- Any in-progress work
- Memory sections loaded
- Suggested focus (priority-first — high-priority tasks outrank the last
  session's "Next Session" suggestion)

## Session End Sequence

When the user signals they're done, the agent follows these steps:

### 1. Write the session log

Create a session log in the appropriate sessions folder (`Sessions/` at the
vault root, or the project's `sessions/` subfolder for project-scoped logs):

**Filename:** `YYYY-MM-DD-session-log-{letter}.md` (a, b, c for multiple
sessions on the same day). Always check what exists immediately before writing
to avoid collisions.

**Frontmatter:**

```yaml
---
title: "Descriptive topic title"
date: 2026-01-15
created: 2026-01-15T15:30:00-05:00
type: session-log
agent: claude-code
tags: [session-log]
---
```

**Required body sections:**
- **Summary** — 2-3 sentences
- **Changes Made** — bullet list of files created or modified
- **Key Decisions** — what was decided and why
- **Open Items** — anything unresolved (`_None._` if empty)
- **Next Session** — what to focus on next

### 2. Update instruction files

Update the "Last Session" pointer to the new log. Add a row to the session
history table (if the project maintains one). Keep the last 15 entries, newest
first.

### 3. Reconcile task boards

If boards are enabled:
- Complete finished tasks (checkbox + done date + move to Done lane)
- Add tasks discovered during the session
- Reset stale in-progress markers — anything marked in-progress but with no
  real progress goes back to todo
- Reorder by priority

### 4. Run extensions

If the project defines Session End Extensions (full protocol only), run them.

### 5. Review memory

If memory is enabled:
- Review the conversation for durable facts (stated, demonstrated, inferable)
- Check for duplicates before proposing new entries
- Show proposals to the user for approval
- Write only on confirmation — append-with-dates, newest first
- Frame inferred items as "it seems like..." so the user can correct

### 6. Output completion summary

Confirm what was done so the user can verify:

```
Session end complete:
- Session log: Sessions/2026-01-15-session-log-a.md
- TASKS.md: 2 done, 1 added
- Pointer updated, history row added
- About Me/: 1 entry proposed and approved
```

## Full vs Lightweight Protocol

### Full protocol

Includes everything above plus:
- Extension points (Agent Role, Session Start Extensions, Agent Operations,
  Session End Extensions, Response Style)
- Board reconciliation at session end
- Memory review at session end
- Per-project instruction file templates with extension stubs

Best for: users who work on multiple projects, want agents to grow smarter over
time, and are comfortable with a structured workflow.

### Lightweight protocol

Simplified version:
- Session start reads the last log, still lists tasks and grounds memory if
  those components are enabled, and summarizes
- Session end writes a log and updates the pointer
- No extension points
- No board reconciliation (boards still work, they're just not automatically
  reconciled)
- No memory review step (memory still works, entries are added via the remember
  skill only — no automatic end-of-session proposals)

Best for: users who want basic continuity without the full ritual, or who are
starting with a minimal setup and may upgrade later.

## Task Board Conventions

All task boards use 5 lanes: **Active / Up Next / Waiting On / Someday / Done**.

### Card format

Each task is a markdown checkbox item:

```markdown
- [ ] Short task description ➕ 2026-01-15
- [/] In-progress task ➕ 2026-01-15
- [ ] High-priority task ⏫ ➕ 2026-01-15
- [ ] Scheduled + due ➕ 2026-01-15 ⏳ 2026-01-20 📅 2026-01-25
- [x] Completed task ➕ 2026-01-15 ✅ 2026-01-20
```

### Checkbox statuses

| Status | Meaning |
|---|---|
| `[ ]` | Todo — not started |
| `[/]` | In-progress — active work happening |
| `[x]` | Done — completed |
| `[-]` | Cancelled — abandoned |

### Date signifiers

| Emoji | Meaning | Required? |
|---|---|---|
| `➕` | Created date | **Always required** |
| `📅` | Due date | Only for real deadlines |
| `⏳` | Scheduled date | When you plan to do it |
| `🛫` | Start date | Work can't begin before this |
| `✅` | Done date | Stamped on completion |
| `❌` | Cancelled date | Stamped on cancellation |

### Priority markers

Optional, placed before date emojis:

| Emoji | Level |
|---|---|
| `🔺` | Highest |
| `⏫` | High |
| `🔼` | Medium |
| `🔽` | Low |
| `⏬` | Lowest |

No priority emoji = normal (between medium and low).

### Board rules

- New tasks are always `[ ]` — creating a task is not starting work on it
- Mark `[/]` only when you are about to begin actual work
- A `[/]` task might be another agent's active work — verify before picking it up
- Completing a task = checkbox `[x]` + `✅` date + move to Done lane
- Cards stay short — verbose descriptions go in linked task notes

## Extension Points

The full protocol supports 5 extension sections in project instruction files:

| Section | When it runs |
|---|---|
| `## Agent Role` | Session start — primes the agent's role and domain |
| `## Session Start Extensions` | After the standard start sequence |
| `## Agent Operations` | Mid-session, when their triggers occur |
| `## Session End Extensions` | After board reconciliation, before memory review |
| `## Response Style` | Applies to all output for the session |

Extensions are optional stubs. The onboarding creates them as empty sections
with explanatory comments. Users fill them in per-project as needed — or use
the project-role skill to define them interactively.

## Tool-Layer Adaptation

The protocol adapts to available tools:

### With vault-cortex

```
vault_read_note     → read notes and session logs
vault_list_tasks    → list and filter tasks across boards
vault_update_task   → complete tasks atomically (checkbox + date + lane move)
vault_get_memory    → read memory files by section
vault_memory_recall → semantic search across memory
vault_write_note    → create session logs
vault_search        → find notes by content, tags, or properties
```

### Without vault-cortex

```
Read file           → read notes and session logs
grep / search       → find content by keyword
Write file          → create session logs
Append to file      → add entries to memory files, task boards
```

The protocol's logic is the same — only the tool references change. vault-cortex
adds semantic search (finding memory entries even when phrasing differs), atomic
task operations, and remote access. Without it, agents use direct file
operations and keyword matching.
