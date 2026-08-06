# Claude Code — Global Config

**User**: {{USER_NAME}}
**Timezone**: {{USER_TIMEZONE}}

## Communication Preferences

{{COMM_PREFS}}

## Vault

**Path**: {{VAULT_PATH}}

{{VAULT_STRUCTURE_MAP}}

{{#IF_VAULT_CONVENTIONS}}
## Vault Conventions

{{VAULT_CONVENTIONS}}
{{/IF_VAULT_CONVENTIONS}}

{{#IF_PROTOCOL}}
# Session Protocol

{{PROTOCOL_BODY}}
{{/IF_PROTOCOL}}

{{#IF_MEMORY}}
## Memory System

Memory files live in `{{MEMORY_FOLDER}}/` within the vault. Five core files:
Me (identity), Principles (values), Opinions (evolving views), Agents (AI
directives), Routines (current-state, living policy).

{{#IF_VAULT_CORTEX}}
**Tools:** Use vault-cortex MCP tools for all vault reads and writes. Key tools:
- `vault_get_memory({ file, section })` — read targeted memory
- `vault_memory_recall({ query })` — semantic search across all memory
- `vault_update_memory({ file, section, entry })` — append a dated entry
- `vault_list_memory_files()` — survey files and sections

Never call `vault_get_memory()` without arguments — the memory layer is too
large to dump.
{{/IF_VAULT_CORTEX}}
{{^IF_VAULT_CORTEX}}
**Reading memory:** Read files directly from `{{VAULT_PATH}}/{{MEMORY_FOLDER}}/`.
Each file has a scope callout defining what belongs — check it before adding
entries.
{{/IF_VAULT_CORTEX}}
{{/IF_MEMORY}}

{{#IF_BOARDS}}
## Task Boards

Task boards use 5 lanes: Active / Up Next / Waiting On / Someday / Done.
Cards use checkbox statuses (`[ ]` todo, `[/]` in-progress, `[x]` done,
`[-]` cancelled) with emoji date signifiers (`➕` created, `📅` due, `⏳`
scheduled, `🛫` start, `✅` done, `❌` cancelled).

{{#IF_VAULT_CORTEX}}
Use `vault_list_tasks` for structured data and `vault_update_task` for atomic
completion.
{{/IF_VAULT_CORTEX}}
{{^IF_VAULT_CORTEX}}
Read and edit `{{TASKS_PATH}}` directly: check the box, append the `✅` done
date, and move the card to the Done lane in the same edit.
{{/IF_VAULT_CORTEX}}
{{/IF_BOARDS}}
