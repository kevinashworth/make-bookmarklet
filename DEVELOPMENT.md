# Development Notes

This document is for maintainers and contributors (internal notes).

## Quick checklist (short)

- Create a branch: `git checkout -b kevin/<feature>`
- Do work and commit
- Add a changeset if the change should trigger a release: `npx changeset add`
- Lint: `npm run lint`
- Lint: `npm run lint:md`
- Fix markdownlint issues: `npm run lint:md:fix`
- Test: `npm test -- --run`
- Push branch, open a PR against `main`, get 1 approval and wait for checks to pass
- Merge PR to `main`
- Merge the "Version Packages" PR the Release workflow opens
- Verify: check GitHub Releases and tags

## Local setup

1. Clone the repo and install dev dependencies: `npm i`.
2. Link the package locally for CLI testing: `npm link`.

## Running the CLI locally

- Run the CLI directly with node: `node src/make-bookmarklet.js <input-file>` or `node src/unmake-bookmarklet.js <input-file>`.
- After `npm link`, run `make-bookmarklet <input-file>` or `unmake-bookmarklet <input-file>`.

## Testing

- Run unit tests: `npm test` (Vitest is used).
- Add tests under `src/__tests__`. Use ESM `import` syntax and add CLI tests that use `execa`.
- Mock clipboardy in tests (example with Vitest: `vi.mock('clipboardy', () => ({ default: { writeSync: () => {}, write: async () => {} } }))`).

## Linting

- Run oxc linter: `npm run lint`. Fix with `npm run lint:fix`.
- Run Markdown linter: `npm run lint:md`. Auto-fix supported Markdown issues with `npm run lint:md:fix`.
- Note: `npm run lint:md:fix` only fixes rules that `markdownlint-cli2` can safely rewrite. Any issues still reported after that command require manual changes.

## Release & versioning (maintainer flow)

The repo uses [Changesets](https://changesets.dev) for versioning. The package is not published to npm; releases are git tags plus GitHub Releases only.

### How it works

- A changeset is a Markdown file under `.changeset/` that records a bump level (`major`, `minor`, or `patch`) and a summary of the change.
- The bump level is chosen by the author with `npx changeset add`; it is not derived from commit messages.
- The GitHub Actions workflow `.github/workflows/release.yml` runs on every push to `main`:
  1. If pending changesets exist, a bot opens a **"Version Packages"** PR that bumps `package.json`, appends `CHANGELOG.md`, and removes the changeset files.
  2. When that PR is merged, the workflow creates a git tag (`make-bookmarklet@<version>`) and a GitHub Release.

### Adding a changeset

- Run `npx changeset add`, pick the bump level, and write a short summary. Commit the generated file.
- Changes that should not release (docs, CI, tests, refactors with no user-facing effect) need no changeset, or an explicit `npx changeset add --empty`.
- Pending changesets accumulate automatically: every merged feature PR adds its changeset file to `main`, and the single "Version Packages" PR keeps updating to include them all. No action is needed to accumulate — just leave the PR open; merging it ships everything pending and, of course, makese way to start a fresh accumulation. Closing it without merging is pointless (it gets recreated on the next push to `main`).

### Release steps

1. Merge feature PRs to `main` as usual (with their changesets).
2. Wait for the Release workflow to open the **"Version Packages"** PR (no checks run on it; bot-created PRs don't trigger CI).
3. Review the version bump and changelog, then merge it.
4. The workflow then creates the tag and GitHub Release automatically. Confirm in GitHub Releases.

## Branching & PR process

- Use topic branches for features (`kevin/<feature>`). Create PRs against `main` with a clear description and tests.

## Notes

- The codebase is ESM-only (`package.json` `type: module`). Keep imports using `.js` for local module paths (e.g., `import foo from './foo.js'`).
- CLI entrypoints preserve the shebangs and are listed under `bin` in `package.json`.
