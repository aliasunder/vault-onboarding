---
name: session-start
description: >
  Execute the session-start protocol — read the last session log,
  {{#IF_BOARDS}}list open tasks, {{/IF_BOARDS}}{{#IF_MEMORY}}selectively load
  memory, {{/IF_MEMORY}}and summarize what's current. Use when asked to "start
  a session", "catch me up", "what's on deck", "what happened last session",
  or at the beginning of a new work session.
  NOT for: mid-session context refreshes (just read the file), or session-end
  (use session-end).
---

# Session Start

Execute the session-start protocol from your instruction files (CLAUDE.md,
Global Instructions, or equivalent). The protocol lives there — not here.
This skill is a trigger, not a copy.

## What to do

1. **Read the session-start protocol** from your instruction files. Follow its
   Session Start Sequence exactly as written.

{{#IF_VAULT_CORTEX}}
2. **Use vault-cortex MCP tools** for all vault reads and task updates
   (`vault_read_note`, `vault_list_tasks`, `vault_list_memory_files`,
   `vault_get_memory`, `vault_memory_recall`). Load schemas via ToolSearch
   if not already loaded.
{{/IF_VAULT_CORTEX}}
{{^IF_VAULT_CORTEX}}
2. **Use native file tools** (Read, grep) for vault reads. Read files directly
   from the vault path specified in your instruction files.
{{/IF_VAULT_CORTEX}}

3. **Verify the protocol loaded.** If you cannot find a Session Protocol in
   your instructions, say so instead of guessing.

## Common pitfalls

{{#IF_MEMORY}}
- Dumping all memory at once — read selectively by file and section, not
  everything at once.
{{/IF_MEMORY}}
{{#IF_BOARDS}}
- Reading TASKS.md as raw markdown instead of using structured task tools
  (if vault-cortex is available).
- Loading Someday items at session start — rarely actionable, often large.
  Skip unless the user asks.
- Treating a `[/]` card as available — `[/]` means an agent started work on
  it. Verify it's free before picking it up.
- Marking new cards `[/]` — creating a task is not starting work. New cards
  are always `[ ]`.
- Ignoring priority markers — `🔺` and `⏫` tasks should be the top focus
  recommendation.
{{/IF_BOARDS}}
- Forgetting to read the last session's "Open Items" and "Next Session" —
  these are the continuity bridge between sessions.
