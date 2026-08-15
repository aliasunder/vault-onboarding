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

## The North Star: A Burden Lifted

Setting up a task-management-and-memory system is normally exhausting, time
consuming, and prone to failure. The person finishing this onboarding should
feel the opposite: relief. The system is already working when the interview
ends — not a pile of homework. Five rules serve this:

1. **Do, don't instruct.** Anything you can do yourself with the access you
   have — write files, create the project, seed memory, save skills — you do.
   Never hand the user a to-do list for work you could have done.
2. **User-side actions are guided live moments, not a list at the end.**
   Pasting into a settings screen or clicking Install in Obsidian is the
   user's to do — so walk them through it one client at a time, right when it
   comes up, and confirm it worked before moving on.
3. **End with the system running, not described.** The final moments of
   onboarding demonstrate the payoff (see Phase 8's live demo): the user
   watches continuity work once, and learns that from now on, starting a
   session takes one phrase.
4. **Explain as you create.** Every file and folder gets a one-line,
   plain-language purpose the moment it appears — and when a name exists
   for mechanical reasons, say the reason: a Perplexity user about to dip
   their toes into Cowork shouldn't wonder why a file is called `CLAUDE.md`
   (it's the filename Claude Code and Cowork automatically read when
   working in that folder), what `.obsidian/` is (Obsidian's own config —
   how the app recognizes the folder as a vault), or why TASKS.md carries
   `kanban-plugin: board` (the Kanban plugin renders any note with that
   frontmatter as a visual board). A system whose parts the user can name
   is one they'll trust and extend; unexplained artifacts read as clutter.
5. **No bare questions.** A question followed by an empty text box hands all
   the effort to the user — overwhelming, especially for open-ended asks.
   Every question ships with 2–4 example answers, presented *prominently
   with the question itself*: as selectable options where the client
   renders them, or as a visible "for example: …" line — never buried
   mid-paragraph where they read as filler. Always leave room for "or tell
   me in your own words." The per-question examples in Phases 0–1 below are
   the floor, not the ceiling — adapt them to what the user has already
   said. **Each question also carries its why** — one line on what answering
   it enables, delivered with the question ("I'll generate an instruction
   file for each tool you pick", "these become standing instructions every
   AI tool follows"). A user who knows what a question unlocks answers with
   intent instead of obligation — and knows what to come back and change
   later.
   **Calibrate every explanation to the technical comfort inferred in
   Phase 0.** For a non-technical user, the explanation itself must carry no
   jargon: not "frontmatter" but "the label section at the top of the
   note"; not "auto-injected" but "Claude reads this file automatically
   when it works in this folder." The bar: someone who has never opened a
   terminal should finish onboarding able to say what each piece is for.

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

**Question 2:** "What kind of work do you primarily do? (This shapes what I
suggest — folders, memory files, examples — so the setup fits your actual
work.)"

Offer examples with the question: software or technical projects · writing
or creative work · school or research · running a business · job searching ·
just organizing my life. Listen for domain signals: engineering, creative,
academic, business, personal knowledge management. This influences which
memory file sections to suggest and what examples to use.

**Question 3:** "What frustrates you most about working with AI across
sessions? (I'll aim each part of the setup at whatever you name here.)"

Offer examples with the question: having to re-explain everything each time ·
losing track of what I was working on · decisions and context disappearing ·
starting from scratch every session · all of the above. This is diagnostic —
it reveals pain points the system addresses (lack of memory, no continuity,
repeated context-setting, lost decisions). Use their answer to frame why
each component exists when you present it.

**Infer technical comfort** from vocabulary. Mentions of CLI, MCP, YAML,
terminal, git = technical. "I just use the app", "I type in the chat" =
non-technical. Never ask "are you technical?" directly — it's off-putting and
unreliable. Adjust your language for the rest of the interview accordingly —
not just the questions, but every file explanation (North Star rule 4), the
Phase 8 recap, and the completion checklist. The whole experience must be
approachable to someone who has never used a terminal or written markdown.

**Checkpoint:** hold this phase's answers in-conversation — the checkpoint
file cannot exist until Phase 2 establishes the vault path. They are written
to disk at the Phase 2 checkpoint gate.

---

### Phase 1: Identity and Context (always runs)

These answers feed instruction files regardless of what else is enabled. They
also seed memory files if the user opts into memory later.

**Question 1:** "What's your name, and what timezone are you in? (So agents
address you properly and get dates and times right.)"

You may pre-fill these from the environment (username, system timezone), but
always **confirm** them with the user ("I have you as X in timezone Y —
right?") — never silently infer identity.

**Question 2:** "What matters most to you in how AI works with you? (These
become standing instructions every AI tool you use will follow.)"

Offer examples with the question: keep it short and to the point · explain
things in detail · just handle things, ask only when unsure · always check
with me before acting · show your reasoning and evidence · just give me
results. Listen for: communication style (concise vs detailed), autonomy
level (just do it vs ask first), verification preferences (trust me vs show
your work). These become directives in instruction files.

**Question 3** (optional): "What principles do you hold firm when making
decisions or managing work? (Agents check these before making judgment calls
on your behalf.)"

Offer examples with the question: nothing goes out to other people without
my review · anything written in my name should sound like me, not AI ·
privacy first — keep personal things out of shared docs · quality over
speed. Skip if the user seems eager to move on. These seed the Principles
memory file if opted in.

**Question 4** (optional): "Anything else about yourself that would help agents
serve you well? (Whatever you share gets remembered — you'll never have to
explain it again.)"

Offer examples with the question — this is the most open-ended ask of the
interview, so it needs them most: how you like to start tasks (e.g. "break
big things into small steps for me") · schedule or energy patterns ("I work
best in the morning") · accessibility or working-style needs (ADHD,
dyslexia, screen readers) · pet peeves ("don't use bullet points for
everything"). Open-ended catch-all — anything they volunteer here routes to
the best-fit memory file in Phase 4.

**Checkpoint:** hold this phase's answers in-conversation — they are written
to disk at the Phase 2 checkpoint gate.

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

**Checkpoint gate:** the path now exists — write `onboarding-progress.md`
NOW, including the held Phase 0–1 answers, and read it back to confirm it's
on disk. Do not ask any Phase 3 question until the checkpoint shows Phases
0–2 complete.

---

### Phase 3: Vault Organization (optional)

**Read `references/vault-organization.md` before this phase.**

Present this phase as: "Before we set up the components you want, let's
organize where things will live in your vault."

**Question 1:** "Do you work on multiple projects or areas of focus? (If so,
each gets its own folder with its own task board and session history — so
work on one never gets tangled up with another.)"

If yes, follow up: "Where should projects live — each project as its own
folder at the vault root, or grouped under a Projects/ folder? (Root keeps
nesting shallow and projects front and center; a Projects/ folder keeps the
vault root tidier once you have many.)" A project is defined by its
contents — a hub file, its TASKS.md, its sessions — not by a container
folder, so both layouts work identically; this is purely the user's
preference. Record the choice (`PROJECTS_LOCATION`) and use it consistently
everywhere a project path appears: the template scaffold, Question 4's
first project, structure maps in instruction files, and generated protocol
paths.

Then scaffold a project template folder structure at the chosen location.
Explain the pattern — each project gets its own folder with subdirectories
for sessions, reference material, research, task notes, and plans. Show an
example (shown grouped; at root, `my-project/` sits directly in the vault):

```
Projects/
  my-project/
    sessions/       — session logs scoped to this project
    reference/      — project-specific reference docs
    research/       — research notes
    task-notes/     — detailed task descriptions
    plans/          — implementation plans, specs
```

A project's TASKS.md is just a markdown note — lanes as headings, tasks as
checkbox lines — so it can exist before Phase 5. That phase decides how
tasks are *rendered* (visual Kanban) and *managed* (agents reconciling the
board), not whether the file may exist.

**Question 2:** "Do you want a place for notes about people you work with?
(Mention someone once — 'my manager Sam', 'the recruiter from Tuesday' — and
agents will know who they are in every future session: their role, your
history with them, what matters to them.)"

If yes: create `People/` with a template note showing the schema (name, role,
organization, context, related links).

**Question 3:** "Do you keep reference material that agents should be able to
consult? (Standing facts you'd otherwise repeat — your tools and setup, house
rules, decisions you've made and why. Answer once, and agents look it up
forever instead of asking you again.)"

If yes: create `Reference/` and explain the living-note pattern — notes that
stay current vs point-in-time decisions.

**Question 4** (only if Question 1 = yes): "Want to set up your first real
project now? Tell me about something you're actually working on."

Don't leave the user with only a template — a scaffold nobody instantiates
is a system nobody uses, and if Phase 5 later chooses per-project boards, no
project means **zero live task boards**. If yes:

1. Copy the template structure to the project's folder at the location
   chosen in Question 1 (`Projects/<their name>/`, or `<their name>/` at
   the vault root).
2. Create the project's **hub file** — the agent-facing note carrying the
   project's purpose, the extension-point stubs (Agent Role, Session
   Start/End Extensions, Response Style), and later the Last Session
   pointer. **Resolve its name once, by what mechanically loads it:**
   - Client mix includes Claude Code or Cowork → `CLAUDE.md` (auto-injected
     when an agent lands in the folder — injection over fetch, for free.
     Claude Code also auto-loads `AGENTS.md` natively, so with a mixed
     agent lineup `AGENTS.md` covers everything with one file)
   - Otherwise → `AGENTS.md` (the cross-tool convention; auto-loaded by
     Cursor, Copilot, Codex-style tools and Claude Code alike). This
     includes clients with file access but no auto-load, like Perplexity —
     the file is still agent-facing there; the generated protocol's
     session-start step is what directs the read instead of injection.
   - A folder note named after the project (the Obsidian-native pattern) is
     a fine user-preference alternative when no client auto-loads anything —
     but default to `AGENTS.md` so any client added later finds it by
     convention.
   Use the resolved name consistently everywhere a project hub file is
   referenced — Phase 7's per-project generation, the protocol's extension
   points, and the project-role skill all target this same file. And tell
   the user why the file got its name (North Star rule 4) — e.g. "it's
   called CLAUDE.md because Claude Code and Cowork automatically read a
   file with that exact name whenever they work in this folder."
3. Create its TASKS.md — a plain markdown note (lanes as headings) that
   works as a task list on its own; Phase 5 later decides whether it
   renders as a visual Kanban and whether agents actively manage it (apply
   the same Kanban-frontmatter rule as Phase 5: keep the marker unless the
   user chose folder-only). **Seed it with real first tasks**: the user
   just told you what they're working on, so capture 2–3 actual cards from
   their answer (with `➕` dates). An empty board is homework; a board that
   already holds their real work is a burden lifted.

Phase 7 then generates per-project instructions for it. If the user defers,
record the deferral — Phase 8's completion checklist must surface "no
project created" as a warning, not silence.

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

Record all conventions — they go into generated instruction files — and
**write them into the vault as a note** (`Reference/Vault Conventions.md` if
a Reference folder was created, vault root otherwise), so the user owns a
copy independent of any instruction file.

**Then give the user a short tour of that note — don't just plop it in.**
The conventions note is the first file full of concepts a newcomer has
never met, so walk through it briefly, calibrated to their comfort level
(North Star rule 4): what frontmatter is ("the label section at the top of
every note — it's how notes get found and sorted"), what a wikilink is
("double brackets connect notes to each other — Obsidian shows the
connections"), what task syntax looks like ("a checkbox line; the little
symbols carry dates and priority so tasks can be searched"). Frame it as
relief, not curriculum: "you don't need to memorize any of this — agents
follow these rules automatically; this note is the cheat sheet if you're
ever curious or want to change something."

**Checkpoint gate:** rewrite the checkpoint with this phase's answers and
read it back. Do not ask a Phase 4 question until the file on disk shows
Phase 3 complete.

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

**Checkpoint gate:** rewrite the checkpoint with this phase's answers and
read it back. Do not ask a Phase 5 question until the file on disk shows
Phase 4 complete.

---

### Phase 5: Task Management (optional)

**Question:** "Do you want a place to keep track of what you're working on,
what's coming up, and what's done? (Agents keep it updated as you work —
finished things get checked off and new tasks get captured without you
maintaining a list.)"

If they work on projects (Phase 3): "Would you like one board for everything,
or a board per project?"

This phase governs how tasks are **rendered and managed** — a TASKS.md is
just a markdown note (lanes as headings) and may already exist: Phase 3
Question 4 creates one for the first project, seeded with real tasks.

**If yes:**

Read `assets/templates/tasks-board.md`. Create TASKS.md at the vault root
(or per-project if chosen). If a TASKS.md already exists at the target
location (from the pre-scan, or created in Phase 3 Question 4), don't
create a new one — it inherits this phase's choices (rendering, agent
management); offer to add any missing lanes instead. If the user chose
one board for everything and a per-project TASKS.md was created in
Phase 3 Question 4, migrate its seeded tasks into the vault-root board
and remove the per-project file — one board means one board, and the
user's real tasks shouldn't be stranded in a file agents won't manage.

The board uses 5 lanes: **Active / Up Next / Waiting On / Someday / Done**.
Explain each briefly:
- **Active** — what you're working on right now
- **Up Next** — what's coming soon
- **Waiting On** — blocked on someone or something else
- **Someday** — ideas and low-priority items
- **Done** — completed work (agents move tasks here automatically)

**Kanban frontmatter:** substitute `{{KANBAN_FRONTMATTER}}` with
`kanban-plugin: board` whenever the user is using Obsidian — whether the
Kanban plugin was detected OR the vault is newly created (a new vault never
has plugins yet, and the frontmatter is inert until the plugin is installed;
stripping it would mean boards never render as Kanban even after the user
installs it). Remove the marker line ONLY when the user chose a folder-only
setup with no Obsidian.

**Plugin walkthrough:** if boards are enabled and the Kanban or Tasks plugin
is not detected, walk the user through installing them now — see the
"Obsidian App Setup" section of `references/setup-verification.md`. Do not
defer this to a footnote: without the Kanban plugin the board renders as
plain markdown, and without Tasks the date/priority metadata isn't
queryable. Skip only for folder-only setups.

**If no:** agents don't manage boards, and no board reconciliation enters
the protocol. A TASKS.md already created in Phase 3 Question 4 stays — it's
the user's plain task list, theirs to maintain by hand; tell them that's
what it now is. Don't create any further boards.

**Checkpoint gate:** rewrite the checkpoint with this phase's answers and
read it back. Do not ask a Phase 6 question until the file on disk shows
Phase 5 complete.

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

**Generate and DELIVER skills:**

Skills to generate:
- **session-start** (always if protocol enabled)
- **session-end** (always if protocol enabled)
- **remember** (only if memory enabled — Phase 4)
- **project-role** (only if full protocol — helps define per-project agent roles)

For each applicable skill:

1. Read the template from `assets/skills/`.
2. Substitute variables based on what was scaffolded.
3. **Write the finished skill into the vault** — `Setup/skills/<name>.md`
   (or a folder the user prefers). This always happens, regardless of
   client: the vault copy survives the session, syncs, and is the source to
   re-deliver from.
4. **Deliver to each client from Phase 0** per the Skill Placement table in
   `references/generated-skills-guide.md` (Claude Code: write to disk;
   Perplexity: save to the user's skill library; claude.ai / Claude Desktop:
   emit as uploadable skill files; clients with no skill mechanism: fold the
   trigger behavior into that client's instruction block in Phase 7).

**Delivery is not optional and not silent.** Generation is complete only
when the checkpoint's files-generated list records every skill with its
delivery destination per client — or an explicit reason it was skipped. An
announced-but-undelivered skill is exactly the failure this rule exists to
prevent: if you are interrupted mid-generation, the checkpoint tells the
resumed session what still needs delivering.

Create a `sessions/` folder at the vault root for session logs. If per-project
folders were scaffolded (Phase 3), note that project-scoped logs go in each
project's `sessions/` subfolder.

**If no:** skip the protocol, the session skills (session-start, session-end,
project-role), and the sessions folder. The **remember** skill is
memory-gated, not protocol-gated — if memory was enabled (Phase 4), still
generate it here. Instruction files still carry identity and preferences —
agents just won't follow a structured session ritual.

**Checkpoint gate:** rewrite the checkpoint with this phase's answers —
including each generated skill's delivery destinations — and read it back.
Do not start Phase 7 until the file on disk shows Phase 6 complete.

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
| Claude Code | `claude-code-global.md` + `claude-code-project.md` | Local: `~/.claude/CLAUDE.md` (global) + per-project template. Cloud: repo-root `CLAUDE.md` (see surface check) | No — has local file access |
| Cowork | `cowork-global.md` + `claude-code-project.md` (reused) | Paste block for Global Instructions + `CLAUDE.md` in each bound project folder | No — bound folder has file access |
| claude.ai chat | `claude-chat.md` | Paste block for Custom Instructions | **Yes** — no file access without it |
| Perplexity | `perplexity.md` | Paste block for Project Instructions | No — Perplexity Computer has local file access |
| Cursor | `cursor.md` | Project `.cursor/rules/` or `.cursorrules` | No — has local file access |
| Copilot | `copilot.md` | `.github/copilot-instructions.md` | No — has local file access |

**vault-cortex is a per-client connection:** detecting vault-cortex in THIS
session says nothing about the user's other clients — each surface
(claude.ai, Cowork, Perplexity, Cursor) connects to it separately. For each
selected client, ask whether vault-cortex is connected there and record the
answer in the checkpoint. claude.ai chat requires it (see the gate below);
for other clients it's an enhancement. Where it's wanted but not set up,
point the user at the vault-cortex setup docs for that surface — never
assume, and never emit `vault_*` tool references in an instruction block for
a client whose connection isn't confirmed.

**Claude Code surface check:** ask whether they use Claude Code locally
(CLI or IDE on their own machine), in the cloud (claude.ai/code web
sessions), or both. Local: generate `~/.claude/CLAUDE.md` from the global
template plus the per-project template. Cloud: there is no persistent
`~/.claude/` — generate a repository-root `CLAUDE.md` from the project
template with the global content folded in, one per repo they work in, and
note it must be committed for cloud sessions to see it. Both: do both.

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
now." Record the skip in the checkpoint (client marked skipped, with the
reason) and exclude skipped clients from Phase 8's verification walkthrough
— a client that was intentionally skipped must not resurface as a setup
step to verify.

For each template:
1. Read the template file.
2. Substitute all `{{VARIABLE}}` markers with the user's answers and scaffolded
   structure. **Substitution safety:** user answers are literal text — strip
   or escape any `{{` / `}}` sequences they contain, keep YAML frontmatter
   values on one line (quote values containing `:` or leading special
   characters), and validate anything used as a path component (no `/`,
   `..`, or leading dots — replace with hyphens). An answer must never
   introduce new template markers, break frontmatter, or change a write path.
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
with instructions on where to paste it — AND **always write the block into
the vault as `Reference/<client>-instructions.md`** (frontmatter: `type:
reference`, tags `[reference, agent-config, <client>]`, with a lead line
naming exactly where it gets pasted, e.g. "Copy/paste source for Perplexity
→ Project Settings → Project Instructions"). The chat delivery is a
convenience copy; the vault note is the record. See "Persisting Paste
Blocks" in `references/client-instructions.md`.

**Deliver one client at a time, as guided live moments** — not a wall of
paste blocks at the end. For each client: present its block, tell the user
exactly where to paste it, wait for them to do it, and verify it took (the
per-client checks in `references/setup-verification.md`) before moving to
the next client. A stack of unpasted blocks is homework; a sequence of
thirty-second guided steps, each confirmed working, is a burden lifted.

**Checkpoint gate:** rewrite the checkpoint with this phase's output —
including the `Reference/` instruction notes written — and read it back. Do
not start Phase 8 until the file on disk shows Phase 7 complete.

---

### Phase 8: Verification and Next Steps (always runs)

**Read `references/progressive-adoption.md` before this phase.**
**Read `references/setup-verification.md` during verification.**

**Walk through what was created:**

List every file and folder that was scaffolded, organized by category, each
with a one-line plain-language description of what it does — and, where the
name is mechanical, why it's called that (per North Star rule 4: `CLAUDE.md`
because Claude tools auto-read it, `AGENTS.md` as the cross-tool convention,
`PROTOCOL.md` as the ritual agents follow, `About Me/` as what agents read
to know the user). This is a recap — each item was already explained once at
creation; here the user sees the whole system in one view they could
re-explain to someone else:
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

**Install companion tools:**

- **obsidian-vault skill** (Obsidian formatting safety — frontmatter,
  wikilinks, plugin syntax). The generated system writes Obsidian-flavored
  markdown constantly, so treat this as part of setup, not an optional extra.
  The check is **per client**: for EACH client selected in Phase 0, check
  that client's own skill mechanism and offer the matching install path
  (Skill Placement table in `references/generated-skills-guide.md`):
  - Claude Code: check `~/.claude/skills/obsidian-vault/` and
    `~/.agents/skills/obsidian-vault/`; if missing, offer to run
    `npx skills add aliasunder/obsidian-vault`.
  - Perplexity: check the user's skill library; if missing, save it there
    (`npx skills add` does not apply — deliver via the client's own save
    path, or point at the release zip from the skill's GitHub releases).
  - claude.ai / Claude Desktop: offer as an uploadable skill.
  - Clients with no skill support: inline the formatting-safety essentials
    into that client's instruction block instead.

  **Never conclude "installed" from a different client's location** — a copy
  under `~/.claude/skills/` covers Claude Code only, and clients the user
  excluded in Phase 0 don't count as coverage.
- **vault-cortex** for remote vault access and semantic search — per-client
  status was recorded in Phase 7; here, resolve any client where it's wanted
  but not yet set up (setup pointers, not assumptions). An enhancement, not
  a requirement — except for claude.ai chat, which requires it.

**Obsidian app setup:** if boards or plugin-dependent features were
scaffolded and the plugins aren't installed yet, run the walkthrough in
`references/setup-verification.md` → "Obsidian App Setup" now (Kanban,
Tasks, optionally Dataview).

**Run the system once — the live demo:**

Before wrapping up, demonstrate the payoff instead of describing it. Run an
abbreviated session-start against the fresh vault, out loud: read the hub
file; if boards were scaffolded, list the open tasks on their board (the
real ones seeded in Phase 3); if memory was enabled, glance at the memory
files seeded from their own interview answers; then produce the short
session-start summary the protocol specifies. With no boards and no memory,
the demo is just hub file + summary — it still lands. Close with the
punchline: "That's what every session starts like now — you just say 'start
session'." The user should watch continuity work once before the
conversation ends; that moment, not the file list, is what makes the setup
feel like a burden lifted rather than a system to learn.

**Clean up:**

Ask whether to keep or remove the `onboarding-progress.md` checkpoint file.
If they might want to re-run or extend later, keep it. Otherwise, remove it.

**Output the completion checklist** (always the last step — nothing above it
counts as done until it appears here). Every line is mandatory; a ✗ or
"skipped" requires the reason. This is what makes a silently dropped step
visible:

```text
Onboarding complete:
- Checkpoint: <✓ saved at every phase gate / ✗ + reason>
- Vault structure: <folders + conventions created>
- Memory: <files created + seeded, or "not enabled">
- Task boards: <boards created, or "not enabled">
- First project: <name, or "⚠ none created — per-project boards inert until one exists">
- Protocol: <full / lightweight / none>
- Skills: <each skill × client destination, vault copy path, or skip reason>
- Instruction files: <per client: written path or pasted + Reference/ note path>
- vault-cortex: <per client: connected / setup pointer given / not wanted>
- obsidian-vault skill: <per client: installed / delivered / inlined / skipped + reason>
- Obsidian plugins: <installed / walkthrough given / N/A folder-only>
- Checkpoint file: <kept / removed>
```

---

## Checkpoint System

The checkpoint file (`onboarding-progress.md` in the vault root) tracks the
current phase, a completed-phases checklist, and the saved answers from each
phase. The canonical template is `assets/templates/onboarding-progress.md` —
read it, substitute the `{{VARIABLE}}` markers with the answers collected so
far (leave markers for phases not yet reached), and rewrite it at every gate.

**The gate rule: a phase is not complete until the checkpoint on disk says
so.** At the end of every phase (from Phase 2 onward): rewrite the checkpoint
with everything collected so far, read it back to confirm it exists and lists
the phase as complete, and only then ask the next phase's first question. If
the read-back fails, stop and fix the write before proceeding — an interview
that runs ahead of its checkpoint is un-resumable.

**Why this is a hard rule, not bookkeeping:** onboarding sessions are long.
They get interrupted ("I need to stop"), and chat clients compact long
conversations — in-conversation answers are NOT durable state. Never present
"everything so far is in this conversation" as a resume plan; the checkpoint
file is the resume plan. A user who pauses mid-interview must find their
answers on disk, not in a thread that may be compacted or lost.

**First write (the only boundary):** the checkpoint can only be written once
a vault or folder path exists. During Phases 0–1, hold answers in the
conversation; the moment Phase 2 establishes the path, write the checkpoint
— including the held Phase 0–1 answers — before asking any Phase 3 question.

**Resume logic:** When resuming, read the checkpoint, greet the user with a
summary of where they left off, and continue from the next incomplete phase.
Don't re-ask questions whose answers are already saved. Check the
files-generated list for anything recorded as pending delivery (e.g. skills
generated but not yet delivered to a client) and finish it.

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

Detection: check whether the vault-cortex MCP server's tools appear in the
current session's tool list. If they don't, ask the user: "Do you have vault-cortex installed? It adds
remote access, search, and semantic memory recall to your vault. Everything
works without it — vault-cortex enhances the experience."

Detection here covers the CURRENT surface only. Connection status for the
user's other clients is collected per client in Phase 7 — never generalize
this session's detection to instruction files for other surfaces.

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
| `{{PROJECTS_LOCATION}}` | Phase 3 (root folders vs Projects/ container) | Checkpoint |
| `{{HAS_PEOPLE}}` | Phase 3 | Checkpoint |
| `{{HAS_REFERENCE}}` | Phase 3 | Checkpoint |
| `{{FILES_GENERATED}}` | Phases 4–7 output | Checkpoint |
| `{{SKILLS_DELIVERED}}` | Phase 6 delivery (skill × client destination, or skip reason) | Checkpoint |
| `{{INSTRUCTIONS_PERSISTED}}` | Phase 7 (`Reference/<client>-instructions.md` paths) | Checkpoint |
| `{{VAULT_CORTEX_CLIENTS}}` | Phase 7 (per-client connection status) | Checkpoint |
