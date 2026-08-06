# Memory System

Best practices for the About Me/ memory layer. Read this before Phase 4
(Memory) of the onboarding interview.

## Three-Layer Model

The vault memory system has three layers, each serving a different purpose:

| Layer | Role | Location | Persistence |
|---|---|---|---|
| **Semantic** — "who I am" | Durable facts, preferences, opinions, principles, agent directives | `About Me/` | Permanent (append-only or living) |
| **Episodic** — "what happened" | Session logs — what was done, decided, left open | `sessions/` folders | Permanent (write-once) |
| **Working** — "what's current" | Project state — instruction files, task boards, active plans | Project folders | Evolving |

**Key principle:** know which layer you're reading from or writing to. Don't mix
them — a session log is episodic (what happened), not semantic (who you are). A
preference is semantic (who you are), not working (current project state).

### Semantic memory (About Me/)

Five core files, each with a distinct scope. The scope callout at the top of
each file tells agents what belongs there and what doesn't — this prevents
entries from landing in the wrong file.

### Episodic memory (sessions/)

Session logs are the narrative record. Each session writes one log with a
standard structure: Summary, Changes Made, Key Decisions, Open Items, Next
Session. Logs are write-once — never edited after the session ends.

### Working memory (project files)

Instruction files (CLAUDE.md, etc.), task boards (TASKS.md), and active plans.
These evolve throughout a project's lifecycle. The "Last Session" pointer in
instruction files bridges episodic and working memory — it tells the next
session where to find continuity.

## Memory File Anatomy

Each About Me/ file follows the same structure:

```markdown
---
title: File Name
created: {{CREATED_TIMESTAMP}}
type: profile
entry-policy: append-only
tags:
  - memory
  - file-specific-tag
related:
  - "[[About Me/OtherFile]]"
---

# File Name

> [!info] Scope of this file
> **Contains:** What belongs here.
> **Does NOT contain:** What goes elsewhere (with routing arrows).
> **Section structure:** How sections are organized.
> **Convention:** Entry format and policy.

## Section Name (newest first)

- **2026-01-15**: Entry text here — a single dated bullet.
- **2026-01-10**: Older entry below.
```

### Key elements

**Scope callout:** The `> [!info]` block at the top defines what goes in this
file and explicitly routes other content to sibling files. This is the routing
test — agents read the scope before deciding where to write.

**Sections with "(newest first)":** Each H2 section groups entries by theme.
The "(newest first)" suffix is a convention signal — entries within a section
are sorted by date, newest at the top.

**Dated bullets:** Every entry is a single line starting with
`- **YYYY-MM-DD**:` followed by a space. The date is the day the entry was recorded (not when the
fact became true). Entries are facts, not conversation — write in third person
or as declarative statements.

**Cross-file links:** The `related:` frontmatter connects sibling files so the
graph shows the memory system as a cluster.

## Entry Policies

Two policies govern how entries are managed over time:

### Append-only (default)

Used by: Me, Principles, Opinions, Agents

Rules:
- New entries are appended at the top of the relevant section (newest first)
- Existing entries are **never** edited or deleted
- When a preference changes, append a new entry — the old one stays as history,
  and newest-first means the current stance is always on top
- ISO dates only, one line per entry

This creates a durable timeline. An agent can see how a preference evolved by
reading down through the dates.

### Living

Used by: Routines

Rules:
- New entries are appended newest first (same as append-only)
- **Expired entries are actively pruned** — when an upcoming event passes or a
  commitment ends, delete it
- If the outcome is worth keeping, move it to the "Recent past" section before
  deleting from "Upcoming" or "Active commitments"
- Recent past entries are dated history and are NOT pruned

Living policy is for current-state snapshots. Routines.md answers "what's going
on in my life right now?" — stale entries are noise, not history.

## The Five Core Files

### Me.md
**Scope:** Identity, interests, durable context — who the user is.
**Sections:** Identity, Interests, Context
**Entry policy:** Append-only
**Seeds from interview:** Name, timezone, domain expertise, open-ended context.

### Principles.md
**Scope:** Stable values, decision heuristics, non-negotiables — how the user
thinks.
**Sections:** Decision heuristics, Working style, Non-negotiables
**Entry policy:** Append-only
**Seeds from interview:** Principles and decision-making style from Phase 1.

### Opinions.md
**Scope:** Evolving views on tools, patterns, methods — stances that shift over
time.
**Sections:** Tools and workflows, Code patterns, Communication preferences
**Entry policy:** Append-only
**Seeds from interview:** Tool preferences, communication style observations.

### Agents.md
**Scope:** Directives for AI agent behavior — how agents should work with the
user. Every entry is about *agent behavior*, not user facts.
**Sections:** Communication, Working style, Verification & scope
**Entry policy:** Append-only
**Seeds from interview:** Communication preferences, autonomy/verification
preferences from Phase 1.

### Routines.md
**Scope:** Current-state snapshot — active commitments, upcoming plans,
recurring rhythms.
**Sections:** Active commitments, Upcoming, Daily/weekly rhythm, Recent past
**Entry policy:** Living (expired entries get pruned)
**Seeds from interview:** Rarely seeded at onboarding — this file grows
organically as agents learn the user's rhythms.

## Organic Growth

Memory files are designed to grow over time through normal agent interaction,
not through dedicated "fill out your profile" sessions.

**How entries get added:**

1. **Explicit capture:** The user says "remember this" or "save this preference"
   → the remember skill (if generated) proposes an entry, gets approval, writes.
2. **Session-end review:** At the end of each session, the protocol prompts the
   agent to review the conversation for durable facts at three levels:
   - Stated — things the user directly said
   - Demonstrated — preferences revealed by choices made
   - Inferable — reasonable conclusions from the conversation's arc
3. **Organic observation:** Over sessions, agents notice patterns and propose
   entries. "It seems like you prefer X" framing lets the user confirm, refine,
   or reject.

**Growth guard:** Every proposed entry goes through a duplicate check (has this
already been captured?) and an approval gate (the user confirms before any
write). No silent memory writes.

## Memory Without vault-cortex

Without vault-cortex, memory operations use native file tools:

| Operation | With vault-cortex | Without |
|---|---|---|
| Read memory | `vault_get_memory({ file, section })` | Read the file directly |
| Check for duplicates | `vault_memory_recall({ query })` | Grep the file for similar entries |
| Add entry | `vault_update_memory({ file, section, entry })` | Append a dated bullet to the section |
| List files | `vault_list_memory_files()` | List files in `About Me/` |

The structure is the same — only the tools differ. vault-cortex adds semantic
search (finding entries even when phrasing differs) and remote access; without
it, agents use direct file reads and keyword matching.

## Domain-Specific Memory Files

Beyond the 5 core files, users can create domain-specific memory files that
follow the same anatomy:

- **Career.md** — for job seekers or career-focused users (targets, skills,
  interview prep, work history)
- **Portfolio.md** — for creative professionals (projects, style evolution,
  client preferences)
- **Health.md** — for health tracking (routines, dietary preferences, medical
  context)

The pattern is the same: frontmatter with `type: profile` and `entry-policy`,
scope callout defining what belongs, themed sections with "(newest first)".
Explain the pattern so users can create their own.
