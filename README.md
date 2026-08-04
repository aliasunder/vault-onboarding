# vault-onboarding

Bootstrap an agent collaboration system into an Obsidian vault — memory, protocols, task boards, and per-client instruction files via a conversational interview.

Works with Claude Code, Cowork, claude.ai, Perplexity, Cursor, GitHub Copilot, and [many more](https://skills.sh).

## Installing

```bash
npx skills add aliasunder/vault-onboarding
```

## What it does

A single conversational interview scaffolds everything you need for structured AI agent collaboration in your Obsidian vault:

- **Memory files** — About Me/ files that give agents persistent knowledge about who you are, what you prefer, and how you work
- **Session protocol** — structured start and end rituals so agents maintain continuity across sessions
- **Task boards** — 5-lane Kanban boards for tracking work with AI agents
- **Generated skills** — session-start, session-end, remember, and project-role skills tailored to your actual vault structure
- **Client instruction files** — generated for each AI tool you use, in the right format for each client's loading contract

Every component is optional. Start with just instruction files (agents know your name and preferences), add memory when you want persistence, add boards when you want task tracking, add the session protocol when you want full continuity.

## How it works

The skill runs a branching interview — it asks what you need and scaffolds only that:

1. **Calibration** — which AI tools you use, what kind of work you do
2. **Identity** — name, timezone, how you want agents to work with you
3. **Vault setup** — detect or create an Obsidian vault
4. **Organization** — project folders, People/, Reference/, vault conventions (tags, linking, schemas)
5. **Memory** — About Me/ files seeded with your answers
6. **Tasks** — Kanban boards with 5 lanes
7. **Protocol** — session start/end sequences, generated skills
8. **Client setup** — instruction files for each of your AI tools
9. **Verification** — walk through everything, test it works

The interview is resumable — stop mid-onboarding and pick up where you left off next session.

## Standalone or with vault-cortex

Works without [vault-cortex](https://github.com/aliasunder/vault-cortex) using native file tools. With vault-cortex connected, the generated skills unlock remote access, hybrid search, and semantic memory recall.

## License

[MIT](LICENSE)
