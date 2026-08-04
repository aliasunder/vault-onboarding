# Global Instructions — {{USER_NAME}}

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

{{#IF_MEMORY}}
## Memory System

Memory files live in `{{MEMORY_FOLDER}}/` within the vault. Five core files:
Me (identity), Principles (values), Opinions (evolving views), Agents (AI
directives), Routines (current-state, living policy).

Each file has a scope callout defining what belongs. Read it before adding
entries. Entries are dated bullets, newest first, ISO dates.

{{#IF_VAULT_CORTEX}}
Use vault-cortex MCP tools: `vault_get_memory`, `vault_memory_recall`,
`vault_update_memory`, `vault_list_memory_files`.
{{/IF_VAULT_CORTEX}}
{{/IF_MEMORY}}

{{#IF_BOARDS}}
## Task Boards

5 lanes: Active / Up Next / Waiting On / Someday / Done.
Checkboxes: `[ ]` todo, `[/]` in-progress, `[x]` done, `[-]` cancelled.
Dates: `➕` created, `📅` due, `⏳` scheduled, `🛫` start, `✅` done.
Priority: `🔺` highest, `⏫` high, `🔼` medium, `🔽` low, `⏬` lowest.

{{#IF_VAULT_CORTEX}}
Use `vault_list_tasks` and `vault_update_task` for structured operations.
{{/IF_VAULT_CORTEX}}
{{/IF_BOARDS}}

{{#IF_PROTOCOL}}
# Session Protocol

{{PROTOCOL_BODY}}
{{/IF_PROTOCOL}}
