# About Me

**Name**: {{USER_NAME}}
**Timezone**: {{USER_TIMEZONE}}

## Communication Preferences

{{COMM_PREFS}}

{{#IF_VAULT_CORTEX}}
## Vault

I use an Obsidian vault for notes, memory, and project management, accessible
via vault-cortex MCP tools.

**Path**: {{VAULT_PATH}}

{{VAULT_STRUCTURE_MAP}}

{{#IF_MEMORY}}
## Memory

My preferences, principles, and opinions are stored in `{{MEMORY_FOLDER}}/`
files in my vault — this is the canonical memory layer, shared across all my
AI tools. Always read and write memory here, not in platform-specific memory
(auto-memory, project memory, etc.). When I ask you to remember something,
propose an entry for the right file and wait for my approval.

Use vault-cortex MCP tools for memory: `vault_get_memory`,
`vault_memory_recall`, `vault_update_memory`.
{{/IF_MEMORY}}

{{#IF_PROTOCOL}}
## Session Protocol

For full session start/end sequences, read `PROTOCOL.md` in my vault via
`vault_read_note`.
{{/IF_PROTOCOL}}
{{/IF_VAULT_CORTEX}}
