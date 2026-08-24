# Contributing

**Windows:** this repo uses symlinks (`CLAUDE.md → AGENTS.md`). Run
`git config core.symlinks true` before cloning, or re-clone after setting
it — otherwise Git checks out symlinks as plain text files containing the
target path.

## Releasing

Cut a release from the GitHub UI:

1. Go to **Actions → Manual Release**
2. Click **Run workflow**
3. Pick `patch`, `minor`, or `major`
4. The workflow bumps `package.json`, commits, tags, builds the `.zip` archive, and creates the GitHub release

## How the CI works

| Workflow | File | Trigger | What it does |
|----------|------|---------|-------------|
| Manual Release | `manual_release.yml` | `workflow_dispatch` (Actions UI) | Bumps version in `package.json` → commits → tags → builds `.zip` → creates GitHub release |
| Auto Release | `auto_release.yml` | `v*` tag push | Validates `package.json` version matches the tag → builds `.zip` → creates GitHub release → updates changelog |

**Version validation**: Auto Release checks that `package.json` version matches the tag. If it doesn't match, it fails with a clear error.

## Version file

Version lives in one place: `package.json` → `version`.

The CI handles this automatically. If you're bumping manually for some reason, update `package.json`.
