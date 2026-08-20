---
title: Session Protocol
type: protocol
protocol-version: v1.0.0
created: {{CREATED_TIMESTAMP}}
tags:
  - agent-config
  - protocol
---

# Session Protocol

The session protocol for this vault. Agents follow this at the start and end of
every work session to maintain continuity.

{{#IF_MEMORY}}
## Memory System

Three memory layers, one vault:

| Layer | Role | Location |
|---|---|---|
| **Semantic** — "who I am" | Durable facts, preferences, opinions, principles, agent directives | `{{MEMORY_FOLDER}}/` |
| **Episodic** — "what happened" | Session logs | `{{SESSION_LOG_FOLDER}}/` |
| **Working** — "what's current" | Project state | Instruction files{{#IF_BOARDS}} + task boards{{/IF_BOARDS}} |

Know which layer you are reading from or writing to — don't mix them.
{{/IF_MEMORY}}

## Session Start Sequence

When a session begins, follow these steps:

### 1. Read instruction files

Read the project's instruction files (CLAUDE.md or equivalent). They define the
project's role, conventions, file map, and any extension sections.

### 2. Read the last session log

Follow the "Last Session" pointer in the instruction file to find the most
recent session log. Read its "Open Items" and "Next Session" sections — these
bridge the gap between sessions.

If there is no pointer or this is the first session, note it and proceed.

{{#IF_BOARDS}}
### 3. List open tasks

Read `{{TASKS_PATH}}` to see active tasks. Focus on Active, Up Next, and
Waiting On. Skip Someday unless the user asks.

{{#IF_VAULT_CORTEX}}
Use `vault_list_tasks` for structured task data with lanes, priorities, and
dates.
{{/IF_VAULT_CORTEX}}
{{/IF_BOARDS}}

{{#IF_MEMORY}}
### {{MEMORY_STEP_NUMBER}}. Ground in memory

Read memory selectively — never dump all files at once:
1. Survey the memory files to see what exists.
2. Read core sections relevant to the session type.
3. Once the topic is known, recall by topic for relevant entries.

{{#IF_VAULT_CORTEX}}
Use `vault_list_memory_files` to survey, `vault_get_memory` for targeted reads,
and `vault_memory_recall` for semantic topic search.
{{/IF_VAULT_CORTEX}}
{{/IF_MEMORY}}

{{#IF_FULL_PROTOCOL}}
### {{EXTENSIONS_STEP_NUMBER}}. Run extensions

If the project defines Session Start Extensions, run them now.
{{/IF_FULL_PROTOCOL}}

### {{SUMMARY_STEP_NUMBER}}. Summarize and recommend

Output a brief summary (10–15 lines):
- Last session topic and date
{{#IF_BOARDS}}
- Active and upcoming tasks
- Any in-progress work ([/] cards)
{{/IF_BOARDS}}
{{#IF_MEMORY}}
- Memory sections loaded
{{/IF_MEMORY}}
- Suggested focus{{#IF_BOARDS}} (priority-first if tasks have priority markers){{/IF_BOARDS}}

Ask whether to proceed with the suggestion or redirect.

{{#IF_BOARDS}}
## Starting Work on a Task

- Mark in-progress BEFORE the first edit — `[/]` on the card, moved to Active.
- `[/]` means active work is happening — not "card was created."
- A card already marked `[/]` may be another agent's live work — verify it's
  free before picking it up.
- New cards are always `[ ]` — creating a task is not starting work on it.
{{/IF_BOARDS}}

## Session End Sequence

When the user signals they're done or wrapping up:

### 1. Write the session log

Create a session log in `{{SESSION_LOG_FOLDER}}/`:

**Filename:** `YYYY-MM-DD-session-log-{letter}.md` (increment the letter for
multiple same-day sessions). Check what exists before choosing the letter.

**Frontmatter:**

```yaml
---
title: "Descriptive topic title"
date: 2026-01-15
created: 2026-01-15T15:30:00-05:00
type: session-log
agent: claude-code            # the client writing this log — e.g. claude-code, cowork, cursor, perplexity
tags: [session-log]
---
```

**Required body sections:**
- **Summary** — 2–3 sentences
- **Changes Made** — bullet list
- **Key Decisions** — what was decided and why
- **Open Items** — anything unresolved (`_None._` if empty)
- **Next Session** — what to focus on next

### 2. Update instruction files

Update the "Last Session" pointer to the new log. If the project maintains a
session history table, add a row (keep the last 15 entries, newest first).

{{#IF_FULL_PROTOCOL}}
{{#IF_BOARDS}}
### 3. Reconcile task boards

- Complete finished tasks: checkbox `[x]` + `✅` date + move to Done lane
- Add tasks discovered during the session with `➕` today's date
- Reset stale `[/]` — anything marked in-progress with no real progress goes
  back to `[ ]`
- Reorder by priority

{{#IF_VAULT_CORTEX}}
Use `vault_update_task` for atomic completion (checkbox + date + lane move in
one call).
{{/IF_VAULT_CORTEX}}
{{/IF_BOARDS}}
{{/IF_FULL_PROTOCOL}}

{{#IF_FULL_PROTOCOL}}
### {{END_EXTENSIONS_STEP}}. Run extensions

If the project defines Session End Extensions, run them now.
{{/IF_FULL_PROTOCOL}}

{{#IF_FULL_PROTOCOL}}
{{#IF_MEMORY}}
### {{MEMORY_REVIEW_STEP}}. Review memory

Review the conversation for durable facts:
- **Stated** — things the user directly said
- **Demonstrated** — preferences revealed by choices
- **Inferable** — reasonable conclusions from the session

Before proposing:
- Check for duplicates — has this already been captured?
- Check the target file's entry policy (append-only or living)
- For append-only: skip duplicates; if a view evolved, add a new entry (old
  stays, newest supersedes)
- For living: skip if still current; if stale, propose deleting and adding
  current state

Show proposals to the user for approval. Write only on confirmation —
append-with-dates, newest first. Frame inferred items as "it seems like..." so
the user can correct.
{{/IF_MEMORY}}
{{/IF_FULL_PROTOCOL}}

### {{COMPLETION_STEP}}. Output completion summary

```text
Session end complete:
- Session log: {{SESSION_LOG_FOLDER}}/YYYY-MM-DD-session-log-X.md
{{#IF_FULL_PROTOCOL}}
{{#IF_BOARDS}}
- TASKS.md: <N done, M added, stale [/] reset — or "no changes">
{{/IF_BOARDS}}
{{/IF_FULL_PROTOCOL}}
- Pointer updated
{{#IF_FULL_PROTOCOL}}
{{#IF_MEMORY}}
- {{MEMORY_FOLDER}}/: <proposals + outcomes, or "none">
{{/IF_MEMORY}}
{{/IF_FULL_PROTOCOL}}
```

{{#IF_BOARDS}}
## Task Board Conventions

All boards use 5 lanes: **Active / Up Next / Waiting On / Someday / Done**.

### Card format

```markdown
- [ ] Short task description ➕ 2026-01-15
- [/] In-progress task ➕ 2026-01-15
- [ ] High-priority task ⏫ ➕ 2026-01-15
- [x] Completed task ➕ 2026-01-15 ✅ 2026-01-20
```

### Checkbox statuses

`[ ]` todo · `[/]` in-progress · `[x]` done · `[-]` cancelled

### Date signifiers

| Emoji | Meaning | Required? |
|---|---|---|
| `➕` | Created | **Always** |
| `📅` | Due | Real deadlines only |
| `⏳` | Scheduled | When you plan to do it |
| `🛫` | Start | Can't begin before this |
| `✅` | Done | On completion |
| `❌` | Cancelled | On cancellation |

### Priority

`🔺` highest · `⏫` high · `🔼` medium · `🔽` low · `⏬` lowest
{{/IF_BOARDS}}

{{#IF_FULL_PROTOCOL}}
## Extension Points

Each project may define these sections in its hub file — the project's
`CLAUDE.md` / `AGENTS.md` / folder note, whichever was chosen during
onboarding:

| Section | When it runs |
|---|---|
| `## Agent Role` | Session start — primes the agent's role |
| `## Session Start Extensions` | After the standard start sequence |
| `## Agent Operations` | Mid-session, when their triggers occur |
| `## Session End Extensions` | After board reconciliation, before memory review |
| `## Response Style` | Applies to all output |

Missing sections are skipped silently.
{{/IF_FULL_PROTOCOL}}
