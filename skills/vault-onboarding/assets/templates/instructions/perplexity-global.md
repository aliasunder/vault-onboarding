# Global Instructions — {{USER_NAME}}

**Timezone**: {{USER_TIMEZONE}}

## Communication Preferences

{{COMM_PREFS}}

## Vault

I use an Obsidian vault at `{{VAULT_PATH}}`.

{{VAULT_STRUCTURE_MAP}}

{{#IF_MEMORY}}
## Memory

Preferences and context are in `{{MEMORY_FOLDER}}/` files in my vault. When I
ask you to remember something, propose an entry for the right file and wait for
approval before writing.

{{#IF_VAULT_CORTEX}}
Use vault-cortex MCP tools: `vault_get_memory`, `vault_memory_recall`.
{{/IF_VAULT_CORTEX}}
{{/IF_MEMORY}}
