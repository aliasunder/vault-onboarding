# Project Conventions — {{USER_NAME}}

**Timezone**: {{USER_TIMEZONE}}

## Communication Preferences

{{COMM_PREFS}}

## Vault Reference

Obsidian vault at `{{VAULT_PATH}}` contains notes, memory files, and project
artifacts.

{{#IF_VAULT_CONVENTIONS}}
## Conventions

{{VAULT_CONVENTIONS}}
{{/IF_VAULT_CONVENTIONS}}

{{#IF_MEMORY}}
## Memory

Preferences stored in `{{VAULT_PATH}}/{{MEMORY_FOLDER}}/`. Read scope callouts
before adding entries. Key files: Me.md (identity), Principles.md (values),
Opinions.md (views), Agents.md (AI directives), Routines.md (current-state,
living policy).
{{/IF_MEMORY}}

{{#IF_BOARDS}}
## Tasks

Task board: `{{TASKS_PATH}}`. Lanes: Active / Up Next / Waiting On / Someday /
Done.
{{/IF_BOARDS}}

{{#IF_PROTOCOL}}
## Session Protocol

For session start/end sequences, read `PROTOCOL.md` in the vault.

## Last Session

_Session-end updates this pointer so the next session can find the latest log._

Last session: none yet
{{/IF_PROTOCOL}}
