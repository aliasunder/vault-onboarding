---
name: remember
description: >
  Save a preference, fact, or observation to the user's memory files. Use when
  the user says "remember this", "save this preference", "store this for later",
  "don't forget", or when a durable fact about the user surfaces that should
  persist across sessions.
  NOT for: session logs (use session-end), task creation (add to TASKS.md
  directly), or temporary notes.
---

# Remember

When the user asks you to remember something — or when a durable fact about
them surfaces during conversation — propose an entry to the right memory file
and wait for approval before writing.

## What to do

### 1. Route to the right file

Read the scope callout at the top of each `{{MEMORY_FOLDER}}/` file. The
callout defines what belongs and what doesn't. Use the routing test:

| If the entry is about... | It goes in... |
|---|---|
| Who they are, identity, interests | Me.md |
| Values, decision heuristics, non-negotiables | Principles.md |
| Evolving views on tools, patterns, methods | Opinions.md |
| How AI agents should work with them | Agents.md |
| Current commitments, routines, upcoming plans | Routines.md |

### 2. Check for duplicates

{{#IF_VAULT_CORTEX}}
Call `vault_memory_recall({ query: "<topic>" })` to search across all memory
files for similar entries.
{{/IF_VAULT_CORTEX}}
{{^IF_VAULT_CORTEX}}
Grep the target file for keywords from the proposed entry.
{{/IF_VAULT_CORTEX}}

If a substantially similar entry exists:
- Same stance → skip (already captured)
- Evolved stance → propose a new entry (old stays, newest supersedes)

### 3. Propose the entry

Show the user exactly what will be written:

```
Proposed entry:
- File: {{MEMORY_FOLDER}}/Opinions.md
- Section: Tools and workflows (newest first)
- Entry: Prefers dark mode in all development tools
```

### 4. Wait for approval

Do NOT write until the user confirms. They may want to:
- Adjust the wording
- Route to a different file
- Decline the entry entirely

### 5. Write the entry

{{#IF_VAULT_CORTEX}}
Use `vault_update_memory({ file: "Opinions", section: "Tools and workflows",
entry: "Prefers dark mode in all development tools" })`.
{{/IF_VAULT_CORTEX}}
{{^IF_VAULT_CORTEX}}
Append a dated bullet to the top of the target section:

```markdown
- **YYYY-MM-DD**: Prefers dark mode in all development tools
```
{{/IF_VAULT_CORTEX}}

## Entry format

- One line per entry
- Start with `- **YYYY-MM-DD**: ` (the date is today, when the entry is recorded)
- Write as a declarative statement, not conversation
- Use third person or neutral voice

## Entry policies

- **Append-only** (Me, Principles, Opinions, Agents): never edit or delete
  existing entries. When a stance evolves, add a new entry — old stays as
  history, newest-first means the current stance is on top.
- **Living** (Routines): expired entries can be pruned. If an outcome is worth
  keeping, move it to "Recent past" before deleting.

## Common pitfalls

- Writing without approval — always propose, then wait
- Putting agent directives in Me or Principles — if the subject is how agents
  should behave, it goes in Agents.md
- Putting identity facts in Agents — if the subject is the user themselves,
  it goes in Me.md
- Forgetting the date prefix — every entry needs `- **YYYY-MM-DD**: `
