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
files in my vault. When I ask you to remember something, propose an entry for
the right file and wait for my approval.
{{/IF_MEMORY}}

{{#IF_PROTOCOL}}
## Session Protocol

For full session start/end sequences, read `PROTOCOL.md` in my vault.
{{/IF_PROTOCOL}}
