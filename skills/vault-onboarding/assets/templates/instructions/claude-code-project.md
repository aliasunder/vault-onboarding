# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## Key Docs

- {{KEY_DOCS_LIST}}

## File Map

| Path | What |
|---|---|
{{FILE_MAP_ROWS}}

## Last Session

_No sessions yet._

## Session History

| Session | Topic |
| --- | --- |

{{#IF_FULL_PROTOCOL}}
## Agent Role

<!-- Define the agent's role for this project. What domain is this? What should
the agent focus on? What context does it need? -->

## Session Start Extensions

<!-- Add project-specific steps to run after the standard session start.
Example: read a specific config file, check a dashboard, review recent PRs. -->

## Agent Operations

<!-- Define mid-session triggers. Example: "When the user pastes a customer
support transcript, extract action items and add to TASKS.md." -->

## Session End Extensions

<!-- Add project-specific steps to run after board reconciliation and before
the memory review. Example: update a project dashboard, sync with external
tools. -->

## Response Style

<!-- Define how the agent should communicate in this project. Example: "Use
technical language — this is a developer project." Or: "Keep explanations
simple — this is for a non-technical audience." -->
{{/IF_FULL_PROTOCOL}}
