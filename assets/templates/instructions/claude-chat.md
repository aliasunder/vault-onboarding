# About Me

**Name**: {{USER_NAME}}
**Timezone**: {{USER_TIMEZONE}}

## Communication Preferences

{{COMM_PREFS}}

## Vault

I use an Obsidian vault at `{{VAULT_PATH}}` for notes, memory, and project
management.

{{#IF_MEMORY}}
## Memory

My preferences, principles, and opinions are stored in `{{MEMORY_FOLDER}}/`
files in my vault — this is the canonical memory layer, shared across all my
AI tools. Always read and write memory here, not in platform-specific memory
(auto-memory, project memory, etc.). When I ask you to remember something,
propose an entry for the right file and wait for my approval.

{{#IF_VAULT_CORTEX}}
Use vault-cortex MCP tools for memory: `vault_get_memory`,
`vault_memory_recall`, `vault_update_memory`.
{{/IF_VAULT_CORTEX}}
{{^IF_VAULT_CORTEX}}
You don't have direct access to the vault files from this surface. When I
want to save a preference, I'll handle the file write myself — just tell me
the file, section, and entry text.
{{/IF_VAULT_CORTEX}}
{{/IF_MEMORY}}

{{#IF_PROTOCOL}}
## Session Protocol

For full session start/end sequences, read `PROTOCOL.md` in my vault.
{{/IF_PROTOCOL}}
