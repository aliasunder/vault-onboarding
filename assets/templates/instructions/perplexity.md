# Project Instructions — {{USER_NAME}}

**Timezone**: {{USER_TIMEZONE}}

## Communication Preferences

{{COMM_PREFS}}

## Vault

I use an Obsidian vault at `{{VAULT_PATH}}`.

{{VAULT_STRUCTURE_MAP}}

{{#IF_VAULT_CONVENTIONS}}
## Vault Conventions

{{VAULT_CONVENTIONS}}
{{/IF_VAULT_CONVENTIONS}}

{{#IF_MEMORY}}
## Memory

Preferences and context are in `{{MEMORY_FOLDER}}/` files. Key files:
- **Me.md** — identity, interests, context
- **Principles.md** — values, decision heuristics
- **Opinions.md** — evolving views on tools and methods
- **Agents.md** — how AI should work with me

{{#IF_VAULT_CORTEX}}
Use vault-cortex MCP tools: `vault_get_memory`, `vault_memory_recall`.
{{/IF_VAULT_CORTEX}}
{{/IF_MEMORY}}

{{#IF_BOARDS}}
## Tasks

Task board at `{{TASKS_PATH}}` with 5 lanes: Active / Up Next / Waiting On /
Someday / Done.
{{/IF_BOARDS}}

{{#IF_PROTOCOL}}
## Session Protocol

For session start/end sequences, read `PROTOCOL.md` in the vault.
{{/IF_PROTOCOL}}
