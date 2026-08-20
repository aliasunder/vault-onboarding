# Progressive Adoption

Adoption tiers, modular growth paths, and advanced features. Read this before
Phase 8 (Verification) of the onboarding interview.

## Adoption Tiers

The system is designed for incremental adoption. Each tier adds a layer of
capability. Users start wherever they're comfortable and grow when they're
ready.

### Tier 0: Identity Only

**What you get:** Agents know who you are.

Components:
- Instruction files with your name, timezone, and communication preferences

**What agents can do:**
- Address you by name
- Respect your timezone for scheduling
- Follow your communication style preferences
- Know your vault location and structure

**Missing:** No memory across sessions, no task tracking, no session continuity.

**When to stay here:** You're trying out AI tools and want a baseline level of
personalization. You can always add more later.

### Tier 1: Identity + Memory

**What you get:** Agents remember things about you.

Components (adds to Tier 0):
- About Me/ memory files (5 core files)
- Remember skill (for capturing preferences on demand)

**What agents can do (adds to Tier 0):**
- Remember your preferences across sessions
- Build up knowledge about how you work
- Route new facts to the right memory file
- Check for duplicates before adding entries

**Missing:** No task tracking, no structured session continuity.

**When to move here:** You're tired of re-explaining your preferences every
session. The memory layer means agents learn and retain.

### Tier 2: Identity + Memory + Boards

**What you get:** Agents track your work.

Components (adds to Tier 1):
- TASKS.md Kanban board(s)
- Task tracking in session protocol (if added)

**What agents can do (adds to Tier 1):**
- Show you what's active, upcoming, and done
- Add tasks discovered during work
- Move completed tasks to Done
- Track priority and scheduling

**Missing:** No structured session start/end ritual.

**When to move here:** You want to track work across sessions without
maintaining a separate project management tool.

### Tier 3: Full System

**What you get:** Complete agent collaboration system.

Components (adds to Tier 2):
- Session protocol (full or lightweight)
- Session-start and session-end skills
- Session logs in `Sessions/` (vault root) and per-project `sessions/` folders
- Extension points for per-project customization
- Project-role skill (full protocol)

**What agents can do (adds to Tier 2):**
- Follow a structured start ritual (read last session, check tasks, load
  memory, summarize)
- Follow a structured end ritual (write log, reconcile board, review memory,
  update pointers)
- Maintain continuity across sessions via handoff logs
- Support per-project agent roles and custom behaviors

**When to move here:** You want agents that maintain full continuity — every
session picks up where the last one left off, nothing falls through the cracks.

## Adding Components Later

Each component can be added independently after the initial onboarding.

### Adding memory to an existing vault

1. Create `About Me/` folder
2. Add the 5 core memory files (use the templates from this skill's assets)
3. Update instruction files to include memory system description
4. Install the remember skill (if using Claude Code)

### Adding boards to an existing vault

1. Create TASKS.md at vault root (or per-project)
2. Add the 5-lane structure (Active / Up Next / Waiting On / Someday / Done)
3. Update instruction files to include board conventions
4. If using Obsidian with the Kanban plugin, add Kanban frontmatter

### Adding protocol to an existing vault

1. Create PROTOCOL.md at vault root
2. Create `Sessions/` folder at the vault root
3. Generate session-start and session-end skills
4. Update instruction files to include protocol text
5. Add Last Session pointer and Session History table to instruction files

### Upgrading lightweight to full protocol

1. Add extension point stubs to instruction files
2. Generate the project-role skill
3. Add board reconciliation to session-end (if boards exist)
4. Add memory review to session-end (if memory exists)

## Advanced Features (Not in V1)

These features are part of the mature system but are too complex for initial
onboarding. They can be adopted manually after the user is comfortable with
the base system.

### Standards reconciliation

When a code practice entry is added to Opinions, reconcile it against a
`Reference/code-standards-*.md` note — amend, replace, add, or no-op. The
reference notes hold current consensus, not history.

**How to adopt:** Create `Reference/code-standards-*.md` notes for your tech
stack. Add reconciliation instructions to your session-end protocol.

### Directives reconciliation

When an agent directive is added to Agents.md, reconcile it against a
`Reference/agent-directives.md` digest — the living consensus of all agent
rules. One write without the other is incomplete.

**How to adopt:** Create `Reference/agent-directives.md` as a living digest.
Add reconciliation instructions to your session-end protocol.

### Code standards loading

Before writing code, load cross-project code standards notes and recall memory
on the work domain. The standards notes are distilled consensus; memory recall
surfaces newer entries not yet reconciled.

**How to adopt:** Create code standards notes tagged `code-standards` with
`type: reference` and `lifecycle: living`. Add loading instructions to your
session-start protocol.

### Protocol versioning and sync

Version-stamp the protocol. Deploy copies via sync mechanisms so stale loads
are detectable. Check for freshness at session start.

**How to adopt:** Add a `protocol-version` property to PROTOCOL.md. Add a
freshness check to session-start.

## vault-cortex Enhancement

vault-cortex adds three capabilities to the base system:

1. **Remote access** — read and write vault notes from any device, any client,
   via MCP tools
2. **Semantic search** — find notes and memory entries even when phrasing
   differs from the search query
3. **Structured operations** — atomic task completion (checkbox + date + lane
   move in one call), memory recall across all files, typed task queries with
   filters

The system works fully without vault-cortex. With it, operations that require
grep and manual file parsing become single tool calls with structured output.

**Installation:** `npx vault-cortex` or see
[github.com/aliasunder/vault-cortex](https://github.com/aliasunder/vault-cortex)
