---
name: vault-onboarding
description: >
  Bootstrap an agent collaboration system into an Obsidian vault — memory,
  protocols, task boards, and per-client instruction files via a conversational
  interview. Use when asked to "set up my vault", "onboard me", "bootstrap
  agent collaboration", "set up session protocols", "configure my vault for
  AI", or at the start of a new vault project. Also trigger when a vault has
  no About Me/ files, no TASKS.md, or no session protocol and the user wants
  to add them. NOT for: editing existing notes (use obsidian-vault), running
  a session protocol (use session-start/session-end), or vault-cortex server
  setup.
---

# Vault Onboarding

You are an onboarding guide. Your job is to interview the user, understand their
setup and needs, and scaffold an agent collaboration system in their Obsidian
vault — tailored to what they actually want, not a one-size-fits-all template.

Every component is optional. The user decides what gets created. Your role is to
explain what each component does, ask if they want it, and build only what they
say yes to.

## How This Skill Works

This skill runs a branching interview across 9 phases. Phases 0, 1, 2, 7, and 8
always run. Phases 3–6 are optional — each scaffolds an independent component
that the user can adopt or skip.

The interview is resumable. A checkpoint file tracks progress so the user can
stop mid-onboarding and pick up next session.

**Reference files** (read on demand — always read BEFORE the phase that needs
them, not after):

- `references/vault-organization.md` — Folder taxonomy, tag discipline, linking
  conventions, frontmatter schemas, escape rules. **Read before Phase 3
  (Organization).**
- `references/memory-system.md` — Three-layer memory model, file anatomy, entry
  policies, scope callouts, organic growth patterns. **Read before Phase 4
  (Memory).**
- `references/protocol-guide.md` — Session protocol anatomy, start/end
  sequences, board conventions, full vs lightweight protocol, tool-layer
  adaptation. **Read before Phase 6 (Protocol).**
- `references/client-instructions.md` — Per-client loading matrix, injection vs
  fetch, generation guide per client, paste formatting. **Read before Phase 7
  (Client Setup).**
- `references/generated-skills-guide.md` — Trigger-skill pattern,
  parameterization, standalone vs vault-cortex adaptation, skill placement per
  client. **Read during Phase 6 (Protocol) when generating skills.**
- `references/progressive-adoption.md` — Adoption tiers, modular growth paths,
  what to add later, advanced features. **Read before Phase 8 (Verification).**
- `references/setup-verification.md` — Per-client verification checklists,
  common issues, troubleshooting steps. **Read during Phase 8 (Verification).**

**Asset templates** (read, substitute variables, write to the user's vault):

- `assets/templates/memory/*.md` — 5 About Me/ file templates (Me, Principles,
  Opinions, Agents, Routines)
- `assets/templates/protocol.md` — Genericized session protocol
- `assets/templates/tasks-board.md` — 5-lane Kanban board
- `assets/templates/onboarding-progress.md` — Checkpoint file for resume
- `assets/templates/instructions/*.md` — 7 client-specific instruction file
  templates
- `assets/skills/*.md` — 4 generated skill templates (session-start,
  session-end, remember, project-role)

## Before You Start

1. **Detect the vault.** Check whether the user's working directory is inside an
   Obsidian vault (look for `.obsidian/` in any ancestor directory). If not, ask
   where their vault is or whether to create one.

2. **Check for an existing checkpoint.** Once the vault (or folder) is located,
   look for `onboarding-progress.md` in its root. If it exists, read it — it
   contains completed phases and saved answers. Resume from where the user left
   off.

3. **Detect existing structure.** If the vault exists, scan for:
   - `About Me/` folder (memory files)
   - `TASKS.md` or any Kanban boards
   - `sessions/` folder
   - `PROTOCOL.md` or protocol content in instruction files
   - `.obsidian/plugins/` for installed plugins (Kanban, Tasks, Dataview)
   - Existing `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`

   Report what you find before starting the interview. Existing components are
   enhanced, not overwritten.

## Interview Flow

### Phase 0: Calibration (always runs)

Ask these three questions. They determine which later phases run and how
instruction files are generated.

**Question 1:** "What AI tools do you currently use to work with your notes or
projects?"

Offer common options: Claude Code, Claude Desktop (Cowork), claude.ai chat,
Perplexity, Cursor, GitHub Copilot. Let them add others. Record the full list —
Phase 7 generates an instruction file for each.

**Question 2:** "What kind of work do you primarily do?"

Listen for domain signals: engineering, creative, academic, business, personal
knowledge management. This influences which memory file sections to suggest and
what examples to use.

**Question 3:** "What frustrates you most about working with AI across
sessions?"

This is diagnostic — it reveals pain points the system addresses (lack of
memory, no continuity, repeated context-setting, lost decisions). Use their
answer to frame why each component exists when you present it.

**Infer technical comfort** from vocabulary. Mentions of CLI, MCP, YAML,
terminal, git = technical. "I just use the app", "I type in the chat" =
non-technical. Never ask "are you technical?" directly — it's off-putting and
unreliable. Adjust your language for the rest of the interview accordingly.

**Save to checkpoint** after this phase.

---

### Phase 1: Identity and Context (always runs)

These answers feed instruction files regardless of what else is enabled. They
also seed memory files if the user opts into memory later.

**Question 1:** "What's your name, and what timezone are you in?"

**Question 2:** "What matters most to you in how AI works with you?"

Listen for: communication style (concise vs detailed), autonomy level (just do
it vs ask first), verification preferences (trust me vs show your work). These
become directives in instruction files.

**Question 3** (optional): "What principles do you hold firm when making
decisions or managing work?"

Skip if the user seems eager to move on. These seed the Principles memory file
if opted in.

**Question 4** (optional): "Anything else about yourself that would help agents
serve you well?"

Open-ended catch-all. Common answers: domain expertise, work schedule, pet
peeves, accessibility needs.

**Save to checkpoint** after this phase.

---

### Phase 2: Vault Setup (always runs)

Establish WHERE things go. Not what gets created — that's Phases 3–6.

**If vault detected:**
- Confirm the vault path.
- Show what existing structure was found (from the pre-scan).
- "I'll work with what's already here and add what you choose."

**If no vault detected:**
- "Would you like to create an Obsidian vault, or just set up a folder
  structure for agent collaboration?"
- If vault: guide them through creating one (Obsidian app or `mkdir` +
  `.obsidian/`). Obsidian is free — mention this.
- If folder-only: create a plain directory structure. Everything still works,
  but without Obsidian features (graph view, backlinks, plugins).

Record the vault/folder path. All subsequent phases write relative to this.

**Save to checkpoint** after this phase.

---

### Phase 3: Vault Organization (optional)

**Read `references/vault-organization.md` before this phase.**

Present this phase as: "Before we set up the components you want, let's
organize where things will live in your vault."

**Question 1:** "Do you work on multiple projects or areas of focus?"

If yes: scaffold a project template folder structure. Explain the pattern —
each project gets its own folder with subdirectories for sessions, reference
material, research, task notes, and plans. Show an example:

```
Projects/
  my-project/
    sessions/       — session logs scoped to this project
    reference/      — project-specific reference docs
    research/       — research notes
    task-notes/     — detailed task descriptions
    plans/          — implementation plans, specs
```

If they'll have task boards (decided in Phase 5), per-project TASKS.md goes
here too.

**Question 2:** "Do you want a place for notes about people you work with?"

If yes: create `People/` with a template note showing the schema (name, role,
organization, context, related links).

**Question 3:** "Do you keep reference material that agents should be able to
consult?"

If yes: create `Reference/` and explain the living-note pattern — notes that
stay current vs point-in-time decisions.

**Vault conventions** — establish during this phase:

- **Tags:** Recommend frontmatter tags, lowercase-hyphenated. Suggest a starter
  taxonomy based on what was scaffolded (e.g., `session-log`, `task-note`,
  `reference`, `project`). No purely numeric tags (Obsidian rejects them).
- **Linking:** Recommend wikilinks with aliases (`[[folder/Note|Display Name]]`)
  as the Obsidian-native default. Explain bidirectional `related:` links.
  Detect existing link style from `.obsidian/app.json` if available.
- **Frontmatter:** Every note gets at minimum `title`, `type`, `tags`,
  `created`. Additional properties per note type.
- **Escape rules:** `\#` before numbers in note content, `\|` in wikilinks
  inside tables.

Record all conventions — they go into generated instruction files.

**Save to checkpoint** after this phase.

---

### Phase 4: Memory (optional)

**Read `references/memory-system.md` before this phase.**

**Question:** "Do you want agents to remember things about you across sessions
— your preferences, opinions, facts about how you work?"

Frame it with their Phase 0 frustration if relevant: "You mentioned [frustration
about repeating context]. Memory files solve that — agents read them at the
start of every session so they know who you are."

**If yes:**

Read the 5 memory templates from `assets/templates/memory/`. For each one:

1. Read the template file.
2. Replace `{{CREATED_TIMESTAMP}}` with the current ISO 8601 timestamp in the
   user's timezone.
3. Write to `About Me/` in the vault.

The 5 core files:
- **Me.md** — identity, interests, context
- **Principles.md** — decision heuristics, working style, non-negotiables
- **Opinions.md** — evolving views on tools, methods, communication
- **Agents.md** — directives for AI agent behavior
- **Routines.md** — current-state snapshot (living entry policy — old entries
  get pruned, unlike the other 4)

After creating the files, seed them with answers from Phase 1:
- Name and timezone → Me.md, Identity section
- Work preferences → Agents.md, Communication section
- Principles → Principles.md, Decision heuristics section
- Open-ended context → route to the best-fit file

**Optional domain-specific file:** "Based on your work in [domain from Phase 0],
would you like a dedicated memory file? For example, a Career.md for tracking
job-related context, or a Portfolio.md for creative work." Explain the pattern
so they can create more later.

**If About Me/ already exists:** show what's there, offer to enhance with Phase
1 answers as new dated entries rather than overwriting.

The **remember** skill is generated if memory is enabled (handled in Phase 6
skill generation).

**If no:** skip memory files entirely. Instruction files still carry identity
and preferences from Phase 1 — agents know who you are, they just don't have
persistent memory across sessions.

**Save to checkpoint** after this phase.

---

### Phase 5: Task Management (optional)

**Question:** "Do you want a place to keep track of what you're working on,
what's coming up, and what's done?"

If they work on projects (Phase 3): "Would you like one board for everything,
or a board per project?"

**If yes:**

Read `assets/templates/tasks-board.md`. Create TASKS.md at the vault root
(or per-project if chosen). If a TASKS.md already exists at the target
location (from the pre-scan), don't create a new one — offer to add any
missing lanes to the existing board instead.

The board uses 5 lanes: **Active / Up Next / Waiting On / Someday / Done**.
Explain each briefly:
- **Active** — what you're working on right now
- **Up Next** — what's coming soon
- **Waiting On** — blocked on someone or something else
- **Someday** — ideas and low-priority items
- **Done** — completed work (agents move tasks here automatically)

If the Kanban plugin is installed (detected in the pre-scan), substitute
`{{KANBAN_FRONTMATTER}}` with `kanban-plugin: board` so the board renders as a
visual board in Obsidian. If the plugin is not installed, remove the marker
line from the frontmatter.

**If no:** skip. No task board, no board reconciliation in the protocol.

**Save to checkpoint** after this phase.

---

### Phase 6: Session Protocol (optional)

**Read `references/protocol-guide.md` before this phase.**
**Read `references/generated-skills-guide.md` during skill generation.**

**Question:** "Do you want agents to follow a session ritual — a structured way
to start and wrap up work so nothing falls through the cracks?"

Frame with their frustration if relevant: "You mentioned [losing context between
sessions]. The session protocol solves that — agents check what happened last
time, review your tasks, and write a handoff log when they're done."

**If yes:** "Would you like the full protocol or a lightweight version?"

- **Full:** Session logs, memory review, board reconciliation, extension points
  for per-project customization.
- **Lightweight:** Start and end summaries only — no extension points, no board
  reconciliation, no memory review step.

**Generate the protocol:**

1. Read `assets/templates/protocol.md`.
2. Substitute variables:
   - `{{CREATED_TIMESTAMP}}` — current ISO 8601 timestamp in the user's
     timezone
   - `{{MEMORY_FOLDER}}` — "About Me" (or skip memory sections if Phase 4 = no)
   - `{{SESSION_LOG_FOLDER}}` — "sessions" (or per-project path)
   - `{{TASKS_PATH}}` — path to TASKS.md (or skip board sections if Phase 5 = no)
   - Step number variables (`{{MEMORY_STEP_NUMBER}}`,
     `{{EXTENSIONS_STEP_NUMBER}}`, `{{SUMMARY_STEP_NUMBER}}`,
     `{{END_EXTENSIONS_STEP}}`, `{{MEMORY_REVIEW_STEP}}`,
     `{{COMPLETION_STEP}}`) — compute sequential step numbers based on which
     optional sections are enabled. Steps that are removed by conditionals
     shift the numbering down.
3. Remove conditional sections based on what was scaffolded:
   - No memory → remove memory-grounding steps from Session Start and memory-
     review steps from Session End
   - No boards → remove task-listing from Session Start and board-reconciliation
     from Session End
   - Lightweight → remove extension points, the board-reconciliation step from
     Session End, and the memory-review step from Session End (boards and
     memory still work — they're just not automatically reconciled or reviewed
     at session end; memory entries flow through the remember skill instead).
     Also remove the board and memory lines from the completion-summary block —
     they report steps that no longer run.
4. Write to the vault root as `PROTOCOL.md`. If a PROTOCOL.md already exists
   (from the pre-scan), never overwrite — show the differences and merge with
   the user's approval.

**Generate skills:**

Read the skill templates from `assets/skills/`. For each applicable skill:

1. Read the template.
2. Substitute variables based on what was scaffolded.
3. Determine placement:
   - Claude Code users: write to `~/.claude/skills/<name>/SKILL.md` (confirm
     the path exists or create it)
   - Other clients: output the skill content and explain where to place it or
     how to use it

Skills to generate:
- **session-start** (always if protocol enabled)
- **session-end** (always if protocol enabled)
- **remember** (only if memory enabled — Phase 4)
- **project-role** (only if full protocol — helps define per-project agent roles)

Create a `sessions/` folder at the vault root for session logs. If per-project
folders were scaffolded (Phase 3), note that project-scoped logs go in each
project's `sessions/` subfolder.

**If no:** skip the protocol, the session skills (session-start, session-end,
project-role), and the sessions folder. The **remember** skill is
memory-gated, not protocol-gated — if memory was enabled (Phase 4), still
generate it here. Instruction files still carry identity and preferences —
agents just won't follow a structured session ritual.

**Save to checkpoint** after this phase.

---

### Phase 7: Client Setup (runs for each client from Phase 0)

**Read `references/client-instructions.md` before this phase.**

For each AI client the user selected in Phase 0, generate the appropriate
instruction file. The content adapts based on what was scaffolded in Phases 3–6.

**Instruction file content (assembled conditionally):**

Always included:
- User identity (name, timezone)
- Communication preferences (from Phase 1)
- Vault path and structure map

Conditionally included (only if the component was scaffolded):
- Vault conventions (from Phase 3) — tags, linking, frontmatter, escapes
- Memory system description and tool instructions (from Phase 4)
- Task board conventions and location (from Phase 5)
- Session protocol (from Phase 6) — either physical text or pointer depending
  on client

**Per-client generation:**

Read the appropriate template from `assets/templates/instructions/`:

| Client | Template | Output location | Requires vault-cortex? |
|---|---|---|---|
| Claude Code | `claude-code-global.md` + `claude-code-project.md` | `~/.claude/CLAUDE.md` (global) + per-project template | No — has local file access |
| Cowork | `cowork-global.md` + `claude-code-project.md` (reused) | Paste block for Global Instructions + `CLAUDE.md` in each bound project folder | No — bound folder has file access |
| claude.ai chat | `claude-chat.md` | Paste block for Custom Instructions | **Yes** — no file access without it |
| Perplexity | `perplexity.md` | Paste block for Project Instructions | No — Perplexity Computer has local file access |
| Cursor | `cursor.md` | Project `.cursor/rules/` or `.cursorrules` | No — has local file access |
| Copilot | `copilot.md` | `.github/copilot-instructions.md` | No — has local file access |

**Cowork project files:** Cowork also reads a `CLAUDE.md` at the root of each
bound folder — the same contract as Claude Code's per-project file. Reuse
`claude-code-project.md` for it: generate one per project folder the user
names, and note in the paste-block instructions that the global paste and the
per-folder files work together.

**Vault-cortex gate for claude.ai chat:** claude.ai chat has no local file
access — without vault-cortex, agents on this surface cannot read or write
vault files. If vault-cortex is not available, **skip claude.ai chat** and
tell the user why: "claude.ai chat requires vault-cortex to interact with
your vault. Install vault-cortex to enable this surface, or skip it for
now."

For each template:
1. Read the template file.
2. Substitute all `{{VARIABLE}}` markers with the user's answers and scaffolded
   structure.
3. Remove conditional sections for components not enabled.
4. Write the file to disk OR present as a paste-ready block with placement
   instructions (depending on the client's loading contract). **Before writing
   to disk, check whether the target file already exists** (e.g. an existing
   `~/.claude/CLAUDE.md`, `.cursorrules`, or
   `.github/copilot-instructions.md`). If it does, never overwrite — show the
   user the new sections and merge them into the existing file with their
   approval.

**Two load-bearing principles:**
- **Injection over fetch.** Physical text in an injected file beats "go read
  this file." Agents that have to fetch instructions often skip or forget.
- **Only Claude Code local expands @-imports.** Every other surface needs the
  text physically present in the instruction file.

For paste-only clients (Cowork Global Instructions, claude.ai Custom
Instructions, Perplexity), format the output as a clearly-marked paste block
with instructions on where to paste it.

**Save to checkpoint** after this phase.

---

### Phase 8: Verification and Next Steps (always runs)

**Read `references/progressive-adoption.md` before this phase.**
**Read `references/setup-verification.md` during verification.**

**Walk through what was created:**

List every file and folder that was scaffolded, organized by category:
- Vault structure (folders, conventions)
- Memory files (if enabled)
- Task board (if enabled)
- Protocol and skills (if enabled)
- Instruction files (per client)

**Verify each client's setup:**

For each client from Phase 0, walk through the verification steps from
`references/setup-verification.md`:
- Is the instruction file in the right location?
- Can the client load it? (Test if possible)
- If protocol was generated, does session-start work?

**Show the progressive adoption path:**

Based on what they adopted, show what they can add later:
- Tier 0 (identity only) → add memory for persistence
- Tier 1 (+ memory) → add boards for task tracking
- Tier 2 (+ boards) → add protocol for full continuity
- Tier 3 (full system) → add vault-cortex for remote access and search

**Recommend companion tools:**

- The `obsidian-vault` skill for Obsidian formatting safety:
  `npx skills add aliasunder/obsidian-vault`
- vault-cortex for remote vault access and semantic search (if not already
  installed): mention it as an enhancement, not a requirement

**Clean up:**

Ask whether to keep or remove the `onboarding-progress.md` checkpoint file.
If they might want to re-run or extend later, keep it. Otherwise, remove it.

---

## Checkpoint System

The checkpoint file (`onboarding-progress.md` in the vault root) tracks the
current phase, a completed-phases checklist, and the saved answers from each
phase. The canonical template is `assets/templates/onboarding-progress.md` —
read it, substitute the `{{VARIABLE}}` markers with the answers collected so
far (leave markers for phases not yet reached), and rewrite it at every save
point.

**First write:** the checkpoint can only be written once a vault or folder
path exists. During Phases 0–1 (before Phase 2 establishes the path), hold
answers in the conversation; write the checkpoint — including the Phase 0–1
answers — at the first save point after Phase 2.

**Resume logic:** When resuming, read the checkpoint, greet the user with a
summary of where they left off, and continue from the next incomplete phase.
Don't re-ask questions whose answers are already saved.

---

## Tool Layer

This skill uses only native file tools (Read, Write, Bash) for its own
operations. It does NOT use vault-cortex MCP tools.

The GENERATED artifacts (instruction files, protocol, skills) branch on
vault-cortex availability:

- **With vault-cortex:** Generated protocol references `vault_*` MCP tools for
  reading notes, searching, managing tasks, and memory operations. Generated
  skills use `vault_list_tasks`, `vault_memory_recall`, etc.
- **Without vault-cortex:** Generated protocol references native file tools
  (Read, Write, grep). Generated skills use direct file reads and appends.

Detection: check if `vault_read_note` is available in the current session's
tool list. If not, ask the user: "Do you have vault-cortex installed? It adds
remote access, search, and semantic memory recall to your vault. Everything
works without it — vault-cortex enhances the experience."

---

## Variable Reference

**Conditional blocks:** templates mark optional sections with
`{{#IF_X}}...{{/IF_X}}` (keep the block only when condition X holds) and
`{{^IF_X}}...{{/IF_X}}` (inverted — keep only when X does NOT hold). When
processing a template, keep or drop each block per its condition and always
strip the marker lines themselves from the output. Markers may also appear
inline within a single line (e.g. in generated skill descriptions) — apply
the same keep/drop rule to the enclosed span and strip the markers, keeping
the rest of the line intact. Conditions used:

| Condition | True when |
|---|---|
| `IF_MEMORY` | Memory enabled (Phase 4 = yes) |
| `IF_BOARDS` | Task boards enabled (Phase 5 = yes) |
| `IF_PROTOCOL` | Protocol enabled (Phase 6 = yes) |
| `IF_FULL_PROTOCOL` | Full protocol chosen (Phase 6 = full) |
| `IF_VAULT_CORTEX` | vault-cortex detected |
| `IF_VAULT_CONVENTIONS` | Vault conventions established (Phase 3 = yes) |

Variables used across templates, listed for reference:

| Variable | Source | Used in |
|---|---|---|
| `{{USER_NAME}}` | Phase 1 | Instructions, checkpoint, memory seeds |
| `{{USER_TIMEZONE}}` | Phase 1 | Instructions, checkpoint |
| `{{VAULT_PATH}}` | Phase 2 | Instructions, checkpoint |
| `{{CREATED_TIMESTAMP}}` | Current time | Memory files, protocol, tasks board, checkpoint |
| `{{MEMORY_FOLDER}}` | "About Me" | Protocol, skills, instructions |
| `{{SESSION_LOG_FOLDER}}` | "sessions" | Protocol |
| `{{TASKS_PATH}}` | Vault root or per-project | Protocol, instructions |
| `{{PROTOCOL_LEVEL}}` | Phase 6 choice | Checkpoint |
| `{{MEMORY_STEP_NUMBER}}` | Computed (Phase 6) | Protocol template |
| `{{EXTENSIONS_STEP_NUMBER}}` | Computed (Phase 6) | Protocol template |
| `{{SUMMARY_STEP_NUMBER}}` | Computed (Phase 6) | Protocol template |
| `{{END_EXTENSIONS_STEP}}` | Computed (Phase 6) | Protocol template |
| `{{MEMORY_REVIEW_STEP}}` | Computed (Phase 6) | Protocol template |
| `{{COMPLETION_STEP}}` | Computed (Phase 6) | Protocol template |
| `{{COMM_PREFS}}` | Phase 1 | Instructions, checkpoint |
| `{{VAULT_CONVENTIONS}}` | Phase 3 | Instructions |
| `{{CLIENTS_LIST}}` | Phase 0 | Checkpoint, Phase 7 loop |
| `{{DOMAIN}}` | Phase 0 | Checkpoint, memory section suggestions |
| `{{TAG_STYLE}}` | Phase 3 | Checkpoint |
| `{{LINK_STYLE}}` | Phase 3 | Checkpoint |
| `{{VAULT_STRUCTURE_MAP}}` | Phases 2–3 | Instructions |
| `{{PROTOCOL_BODY}}` | Phase 6 | Claude Code + Cowork instructions |
| `{{KANBAN_FRONTMATTER}}` | Phase 5 (plugin detection) | Tasks board template |
| `{{PROJECT_NAME}}` | Per-project | Claude Code project template |
| `{{PROJECT_DESCRIPTION}}` | Per-project | Claude Code project template |
| `{{KEY_DOCS_LIST}}` | Per-project | Claude Code project template |
| `{{FILE_MAP_ROWS}}` | Per-project | Claude Code project template |
| `{{CURRENT_PHASE}}` | Progress tracking | Checkpoint |
| `{{START_DATE}}` | First checkpoint write | Checkpoint |
| `{{LAST_UPDATED}}` | Each save point | Checkpoint |
| `{{FRUSTRATION}}` | Phase 0 | Checkpoint |
| `{{COMFORT_LEVEL}}` | Phase 0 | Checkpoint |
| `{{PRINCIPLES}}` | Phase 1 | Checkpoint |
| `{{ADDITIONAL_CONTEXT}}` | Phase 1 | Checkpoint |
| `{{EXISTING_STRUCTURE}}` | Phase 2 | Checkpoint |
| `{{PHASE_3_DECISION}}` | Phase 3 opt-in choice | Checkpoint |
| `{{PHASE_4_DECISION}}` | Phase 4 opt-in choice | Checkpoint |
| `{{PHASE_5_DECISION}}` | Phase 5 opt-in choice | Checkpoint |
| `{{PHASE_6_DECISION}}` | Phase 6 opt-in choice | Checkpoint |
| `{{HAS_PROJECTS}}` | Phase 3 | Checkpoint |
| `{{HAS_PEOPLE}}` | Phase 3 | Checkpoint |
| `{{HAS_REFERENCE}}` | Phase 3 | Checkpoint |
| `{{FILES_GENERATED}}` | Phases 4–7 output | Checkpoint |
