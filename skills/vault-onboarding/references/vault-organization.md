# Vault Organization

Best practices for organizing an Obsidian vault for agent collaboration. Read
this before Phase 3 (Organization) of the onboarding interview.

## Folder Taxonomy

A well-organized vault separates content by purpose, not by format. The
recommended top-level structure:

```
Vault/
  About Me/          — semantic memory (if enabled)
  Projects/          — per-project folders (if user works on projects)
  People/            — notes about colleagues, contacts (optional)
  Reference/         — living reference docs, style guides (optional)
  Sessions/          — vault-wide session logs (if protocol enabled)
  Daily Notes/       — Obsidian daily notes (if used)
  TASKS.md           — vault-wide task board (if enabled)
  PROTOCOL.md        — session protocol (if enabled)
```

### Folder Naming Convention

The vault uses a hybrid naming convention:

- **Top-level folders**: Title Case — About Me/, Projects/, People/,
  Reference/, Sessions/, Daily Notes/
- **Project names**: Title Case — Job Search/, Career Next Steps/
- **Project sub-folders**: lowercase — sessions/, reference/, research/,
  task-notes/, plans/
- **Special files**: ALL CAPS — TASKS.md, AGENTS.md, PROTOCOL.md

Title Case at the vault root makes the sidebar readable at a glance.
Lowercase in project sub-folders keeps them clean in file trees and terminal
listings. This matches the convention most Obsidian vaults use.

State this default to the user ("I'm using Title Case for the main folders
and project names, lowercase for the working folders inside projects").
If the user prefers a different style, record it and apply it consistently —
the important thing is consistency, not the specific convention.

### Project folders

Each project gets its own folder with standardized subdirectories:

```
Projects/
  My Project/
    TASKS.md          — project-scoped task board
    sessions/         — project-scoped session logs
    reference/        — project-specific reference docs
    research/         — research notes
    task-notes/       — verbose task descriptions
    plans/            — implementation plans, specs, drafts
```

The pattern is: each project is self-contained. Session logs, tasks, and
reference material scoped to a project live in its folder. Vault-wide items
(cross-project tasks, general session logs) live at the vault root.

### People folder

Notes about individuals the user works with or references:

```yaml
---
title: Jane Smith
type: person
tags: [person]
role: Engineering Manager
org: Acme Corp
created: 2026-01-15T10:00:00-05:00
related:
  - "[[Projects/acme-integration]]"
---
```

Keep person notes minimal — name, role, context, related links. They're
reference anchors, not biographies.

### Reference folder

Long-lived notes that stay current. Each carries a `lifecycle` property:

- `living` — actively maintained; stale content is a bug
- `decision` — point-in-time reasoning; stamp resolved items, don't rewrite
- `archived` — historical; superseded by something newer

```yaml
---
title: API Style Guide
type: reference
lifecycle: living
tags: [reference, code-standards]
created: 2026-02-01T09:00:00-05:00
---
```

## Tag Discipline

Tags make the vault searchable and the graph navigable.

**Rules:**
- Use frontmatter `tags:` arrays, not inline `#tags` in note bodies (frontmatter
  tags are indexed reliably across all tools)
- Lowercase-hyphenated: `session-log`, not `SessionLog` or `session_log`
- No purely numeric tags — Obsidian rejects them (use a frontmatter property
  instead)
- Hierarchical tags use `/`: `project/my-project`, `type/session-log`

**Starter taxonomy** (based on what gets scaffolded):

| Tag | When to use |
|---|---|
| `session-log` | Session log notes |
| `task-note` | Verbose task descriptions |
| `reference` | Living reference documents |
| `project` | Project-related notes |
| `person` | People notes |
| `memory` | About Me/ memory files |
| `protocol` | Protocol and convention docs |

Suggest tags based on what was scaffolded — don't overwhelm with a taxonomy for
components the user didn't adopt.

## Linking Conventions

### Wikilinks (recommended)

Obsidian-native wikilinks with aliases for readability:

```markdown
[[Projects/my-project|My Project]]
[[About Me/Principles|Principles]]
[[People/Jane Smith|Jane]]
```

The alias (after `|`) controls display text. The full path ensures uniqueness
across folders.

### Bidirectional related links

The `related:` frontmatter property creates explicit graph connections:

```yaml
related:
  - "[[Projects/my-project|My Project]]"
  - "[[People/Jane Smith|Jane]]"
```

**Bidirectional rule:** when adding A → B in `related:`, add B → A in the same
edit. Both notes carry the edge in their Properties pane and graph view.

### Link style detection

If the vault already exists, check `.obsidian/app.json` for:
- `useMarkdownLinks` — if true, the user prefers `[text](path.md)` over
  `[[wikilinks]]`
- `newLinkFormat` — "shortest", "relative", or "absolute"

Respect existing preferences. For new vaults, recommend wikilinks (most
Obsidian-native, best graph/backlink support).

## Frontmatter Schema

Every note gets frontmatter with at minimum:

```yaml
---
title: Note Title
type: note-type
tags: [relevant-tags]
created: 2026-01-15T10:00:00-05:00
---
```

### Required properties

| Property | Type | Notes |
|---|---|---|
| `title` | string | Human-readable title |
| `type` | string | Note classification (`session-log`, `reference`, `person`, `task-note`, `task-board`, `profile`, `protocol`) |
| `tags` | list | Lowercase-hyphenated |
| `created` | string | ISO 8601 with timezone offset, stamped once at creation |

### Common additional properties

| Property | Type | Used by |
|---|---|---|
| `date` | string | `YYYY-MM-DD` calendar anchor (session logs, daily notes) |
| `agent` | string | Which AI tool wrote this (`claude-code`, `claude-desktop`, `cursor`) |
| `related` | list | Bidirectional wikilinks |
| `status` | string | Task notes (`active`, `complete`, `superseded`) |
| `lifecycle` | string | Reference notes (`living`, `decision`, `archived`) |
| `entry-policy` | string | Memory files (`append-only`, `living`) |
| `repo` | string | Code-repo session logs (path to the repo) |

### Timestamps

Timestamps are always full ISO 8601 with the user's timezone offset:
`2026-01-15T10:00:00-05:00`. Never downgrade to date-only when the field
expects a timestamp.

`created` is stamped once at creation and never updated. Use filesystem
modified time for "last touched" queries.

## Escape Rules

Two Obsidian parsing rules that agents must follow:

### Escape `#` before numbers

Obsidian parses `#123` as a tag. In note content, always write `\#123`:

```markdown
Wrong: See PR #42 for details
Right: See PR \#42 for details
```

This applies to PR references, issue numbers, counts, rankings — anywhere a
`#` precedes a number in note body text.

### Escape `|` in wikilinks inside tables

In markdown tables, `|` is the column separator. A wikilink with an alias
inside a table breaks the table:

```markdown
Wrong: | [[Projects/my-project|My Project]] | active |
Right: | [[Projects/my-project\|My Project]] | active |
```

Use `\|` inside wikilinks when they appear in table cells. Outside tables, the
pipe stays unescaped.
