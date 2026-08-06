---
name: session-end
description: >
  Execute the session-end protocol — write session log,
  {{#IF_FULL_PROTOCOL}}{{#IF_BOARDS}}reconcile task board, {{/IF_BOARDS}}{{/IF_FULL_PROTOCOL}}update pointers{{#IF_FULL_PROTOCOL}}{{#IF_MEMORY}},
  review memory for updates{{/IF_MEMORY}}{{/IF_FULL_PROTOCOL}}. Use when asked to "end session",
  "wrap up", "close out", or at the natural end of a work session.
  NOT for: mid-session saves, quick notes, or standalone memory updates.
---

# Session End

Execute the session-end protocol from your instruction files (CLAUDE.md,
Global Instructions, or equivalent). The protocol lives there — not here.
This skill is a trigger, not a copy.

## What to do

1. **Read the session-end protocol** from your instruction files. Follow its
   Session End Sequence exactly as written.

{{#IF_VAULT_CORTEX}}
2. **Use vault-cortex MCP tools** for all vault reads and writes
   (`vault_write_note`, `vault_read_note`, `vault_patch_note`,
   `vault_replace_in_note`, `vault_search_by_folder`,
   `vault_update_task`). Load schemas via ToolSearch if not already loaded.
{{/IF_VAULT_CORTEX}}
{{^IF_VAULT_CORTEX}}
2. **Use native file tools** (Read, Write, append) for vault operations. Write
   session logs directly, update pointers in instruction files.
{{/IF_VAULT_CORTEX}}

## Common pitfalls

- Writing the session log to the wrong folder — route by where the work
  happened (project-scoped, vault-level, or ad-hoc).
- Skipping the completion summary — the user needs to see what ran.
{{#IF_FULL_PROTOCOL}}
{{#IF_BOARDS}}
- Just checking the checkbox without moving the task to Done — completing a
  task = checkbox `[x]` + `✅` date + move to Done lane.
{{#IF_VAULT_CORTEX}}
  Use `vault_update_task` for atomic completion.
{{/IF_VAULT_CORTEX}}
- Forgetting to reset stale `[/]` — anything marked in-progress with no real
  progress goes back to `[ ]`.
{{/IF_BOARDS}}
{{#IF_MEMORY}}
- Writing memory without user approval — always show proposals and wait for
  confirmation.
- Skipping the duplicate check — call
  {{#IF_VAULT_CORTEX}}`vault_memory_recall`{{/IF_VAULT_CORTEX}}{{^IF_VAULT_CORTEX}}grep{{/IF_VAULT_CORTEX}}
  before proposing a new entry.
- Routing entries to the wrong file — read the scope callout at the top of
  each memory file before writing.
- Appending "done" entries to Routines instead of pruning — Routines is
  `entry-policy: living`: expired entries get deleted, outcomes go to Recent
  past.
{{/IF_MEMORY}}
{{/IF_FULL_PROTOCOL}}
- Exceeding 15 rows in the session history table without deleting the oldest.
