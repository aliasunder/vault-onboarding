---
name: project-role
description: >
  Define an agent role for a project — what the project is about, what role
  agents should play, and domain-specific context. Generates an Agent Role
  section for the project's instruction file. Use when asked to "set up this
  project", "define the agent role", "configure project instructions", or
  when starting a new project that needs agent context.
  NOT for: vault-wide setup (use vault-onboarding), session protocols (use
  session-start/session-end), or memory management (use remember).
---

# Project Role

Help the user define an agent role for a project and inject it into the
project's instruction file.

## What to do

### 1. Ask about the project

Ask these questions (skip any the user has already answered):

**"What is this project about?"**
Listen for: domain, purpose, tech stack, scope.

**"What role should agents play in this project?"**
Listen for: autonomy level, specialization, boundaries. Examples:
- "You're a code reviewer focused on TypeScript best practices"
- "You're a research assistant helping me write a paper"
- "You're a project manager keeping me on track"

**"Any domain-specific context agents should know?"**
Listen for: terminology, constraints, stakeholders, sensitive topics.

**"Any behavioral preferences specific to this project?"**
Listen for: response length, formality, proactive vs reactive, what to avoid.

### 2. Compose the Agent Role section

Write a `## Agent Role` section using the user's answers:

```markdown
## Agent Role

You are a [role] for [project description].

**Domain context:** [relevant background, terminology, constraints]

**Behavioral preferences:** [project-specific communication and work style]
```

Keep it concise — 5-10 lines. The role primes the agent's behavior, it doesn't
need to be exhaustive.

### 3. Inject into the instruction file

Find the project's instruction file:
- Claude Code: project `CLAUDE.md` or `CLAUDE.local.md`
- Cowork: the bound folder's `CLAUDE.md`
- Other clients: the project-scoped instruction file

Look for the `## Agent Role` stub (created by onboarding with an HTML comment
placeholder). Replace the stub content with the composed role.

If no stub exists, add `## Agent Role` at the appropriate position in the
instruction file.

### 4. Confirm

Show the user what was written and where. Ask if they want to adjust anything.

## Other extension points

The full protocol supports 4 more extension sections that the user can fill in:

| Section | Purpose | Example |
|---|---|---|
| `## Session Start Extensions` | Project-specific start steps | "Read the latest CI status" |
| `## Agent Operations` | Mid-session triggers | "When I paste a support ticket, extract action items" |
| `## Session End Extensions` | Project-specific end steps | "Update the project dashboard" |
| `## Response Style` | Output formatting | "Use technical language and include code examples" |

Mention these if the user seems interested in customizing further, but don't
push — the Agent Role is the most commonly used extension point.
