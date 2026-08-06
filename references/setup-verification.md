# Setup Verification

Per-client verification checklists and troubleshooting. Read this during
Phase 8 (Verification) of the onboarding interview.

## General Verification

Before checking individual clients, verify the vault structure:

- [ ] Vault/folder exists at the expected path
- [ ] About Me/ files exist (if memory enabled) and have correct frontmatter
- [ ] TASKS.md exists (if boards enabled) with 5 lanes
- [ ] PROTOCOL.md exists (if protocol enabled) with all relevant sections
- [ ] sessions/ folder exists (if protocol enabled)
- [ ] Generated skills are in place (session skills if protocol enabled;
      remember if memory enabled)
- [ ] Onboarding checkpoint file status is current

## Claude Code Verification

### Global instruction file

1. Check that `~/.claude/CLAUDE.md` exists
2. Open a new Claude Code session in any directory
3. Ask: "What's my name and timezone?"
   - Pass: agent responds correctly from the instruction file
   - Fail: agent doesn't know — file not loading

### Per-project template

1. Check that the project instruction template was saved
2. In a project directory with a CLAUDE.md using the template, start a session
3. Ask: "What project am I working in?"
   - Pass: agent knows the project context
   - Fail: project file not loading — check path and parent-walk

### Session protocol (if enabled)

1. In a project with the protocol configured, say "start a session" or invoke
   the session-start skill
2. Verify the agent:
   - Reads the last session log (or notes this is the first session)
   - Lists open tasks (if boards enabled)
   - Loads memory sections (if memory enabled)
   - Outputs a summary matching the protocol template
3. After doing some work, say "end the session" or invoke session-end
4. Verify the agent:
   - Creates a session log in the correct folder
   - Updates the Last Session pointer
   - Reconciles the task board (if boards enabled)
   - Proposes memory entries (if memory enabled and full protocol)

### Skills

1. Check that skills exist at `~/.claude/skills/` or `~/.agents/skills/`
2. Start a new session and say "start a session" — the session-start skill
   should activate
3. If memory is enabled, say "remember that I prefer concise responses" — the
   remember skill should activate

## Cowork Verification

### Global Instructions

1. Open Cowork settings
2. Verify the instruction content is pasted in Global Instructions
3. Start a new Cowork session in any project
4. Ask: "What's my name and timezone?"
   - Pass: agent responds correctly
   - Fail: paste may be truncated or in the wrong field

### Project folder

1. Bind a project folder in Cowork that contains CLAUDE.md
2. Start a session in that project
3. Ask: "What project am I working in?"
   - Pass: agent knows the project from the folder CLAUDE.md
   - Fail: CLAUDE.md may not be in the bound folder root

### Note on @-imports

Cowork does NOT expand `@path` imports. If the instruction file contains
`@AGENTS.md` or similar, those will appear as literal text. All content must be
physically present in the file.

## claude.ai / Mobile Chat Verification

1. Open claude.ai settings → Custom Instructions
2. Verify the instruction content is pasted
3. Start a new conversation
4. Ask: "What's my name and timezone?"
   - Pass: agent responds correctly
   - Fail: paste may be truncated (Custom Instructions has a character limit)

### Character limit workaround

If the full instruction content exceeds the character limit:
- Prioritize identity, timezone, and communication preferences
- Include a protocol pointer: "For full session protocol, read PROTOCOL.md"
- Move detailed conventions to the vault and reference them

## Perplexity Verification

1. Open the Perplexity project settings
2. Verify the instruction content is in Project Instructions
3. Start a new conversation in that project
4. Ask: "What's my name and timezone?"
   - Pass: agent responds correctly
   - Fail: check that instructions are in the project, not global settings

## Cursor Verification

1. Check that the rules file exists at `.cursor/rules/` or `.cursorrules`
2. Open Cursor in the project directory
3. Ask: "What conventions should I follow?"
   - Pass: agent references the conventions from the rules file
   - Fail: check file location and Cursor's rules configuration

## GitHub Copilot Verification

1. Check that `.github/copilot-instructions.md` exists in the repo
2. Open the repo in VS Code with Copilot active
3. Ask Copilot Chat: "What project conventions should I follow?"
   - Pass: references conventions from the instructions file
   - Fail: check file path and that it's committed

## Troubleshooting

### Agent doesn't know my name

- Verify the instruction file exists at the expected path
- Check that it's not empty or malformed
- For paste surfaces: re-paste, checking for truncation
- For file surfaces: check file permissions and encoding (UTF-8)

### Session-start skill doesn't activate

- Verify the skill file exists at the expected path
- Check the skill's `description` frontmatter — it controls trigger matching
- Try explicit invocation: "/session-start" or ask "run the session-start skill"
- Check that the skill directory is one Claude Code scans (`~/.claude/skills/`
  or `~/.agents/skills/`)

### Memory entries going to wrong file

- Read the scope callout at the top of each About Me/ file
- The callout defines routing rules — "Contains" and "Does NOT contain"
- If the remember skill is installed, it checks these rules before proposing

### Task board not rendering as Kanban

- Check that the Obsidian Kanban plugin is installed
- Verify TASKS.md has `kanban-plugin: board` in its frontmatter
- The board renders as a visual Kanban only in Obsidian with the plugin

### Protocol seems incomplete

- Check whether full or lightweight was selected during onboarding
- Lightweight omits: extension points, board reconciliation at session end,
  memory review at session end
- To upgrade: see `references/progressive-adoption.md` → "Upgrading lightweight
  to full protocol"
