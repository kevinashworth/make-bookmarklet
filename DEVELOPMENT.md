# Development Notes

This document is for maintainers and contributors (internal notes).

## Quick checklist (short)

- Create a branch: `git checkout -b my/feature`
- Do work and commit using Conventional Commits (e.g., `feat:`, `fix:`)
- Lint: `npm run lint`
- Lint: `markdownlint --ignore node_modules **/*.md`
- Test: `npm test -- --run`
- Dry-run release: `npm run release:dry-run` (verifies semantic-release decisions)
- Push branch, open a PR against `main`, get 1 approval and wait for checks to pass
- Merge PR to `main` (CI runs tests, then release job if a release is needed)
- Verify: check Actions, GitHub Releases, tags, and `CHANGELOG.md`

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

- Run linter: `npm run lint` (semistandard). Fix with `npm run lint:fix`.

## Release & versioning (maintainer flow)

We now use `semantic-release` in CI (installed at runtime) to automate version bumps and GitHub releases using Conventional Commits. Key points:

- `semantic-release` runs in CI (runtime install) and determines the next version using Conventional Commits.
- Releases happen automatically on **push** to `main`; pull requests will not trigger releases.
- We are **not publishing to npm yet**. The release job creates GitHub releases and tags but does not perform `npm publish`.

Files & configuration:

- `.releaserc.json` — config file (uses the `conventionalcommits` preset and plugins): `@semantic-release/commit-analyzer`, `@semantic-release/release-notes-generator`, `@semantic-release/changelog`, and `@semantic-release/github`.
- `.github/workflows/ci.yml` — contains a `release` job that:
  - runs only on pushes to `main` (an `if` guard is used),
  - depends on the `test` job (so tests/lint must pass),
  - checks out with `fetch-depth: 0`,
  - installs `semantic-release` and required plugins at runtime (`npm install --no-save ...`), and
  - runs `npx semantic-release@25` using the `GITHUB_TOKEN` provided by GitHub Actions.

Testing & rollout:

- To validate behavior locally or in a branch, first install `semantic-release` and the required plugins temporarily (they are installed in CI by the workflow), or use the convenience npm script added to this repo:

```bash
# Manual install + dry-run
npm install --no-save semantic-release @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/changelog @semantic-release/git @semantic-release/github
npx semantic-release --dry-run

# Convenience script (recommended for maintainers)
npm run release:dry-run
```

- Note: `semantic-release` loads plugins from your environment, so running `npx semantic-release` without the plugins installed will cause a `MODULE_NOT_FOUND` error (e.g., `Cannot find module '@semantic-release/changelog'`). In CI we install the plugins at runtime to avoid adding them as dev dependencies.
- We pin the semantic-release major in CI and the convenience script (e.g., `semantic-release@25`) to avoid unexpected breaking changes from a future major release. Update the pinned major intentionally when you want to upgrade and verify with `npm run release:dry-run`.
- Monitor the first automated release to verify the GitHub release notes and tags are created as expected.

Further considerations:

- We commit `CHANGELOG.md` automatically using `@semantic-release/git`. The release commit message includes `[skip ci]` to avoid triggering another release workflow run and creating a CI loop.
- To allow the release job to push changelog commits and tags while keeping branch protection (PRs/reviews required), create a machine user (bot account) and generate a Personal Access Token (PAT). Add the token as a repository secret named `RELEASE_PAT` and the release workflow will use it for pushes.

  Bot PAT management (recommended) — key rules:

  - Least privilege: prefer a **fine‑grained PAT** or grant the **minimum scopes** required (e.g., `contents: write`, `pull_requests: write`) rather than the broad legacy `repo` scope. Grant only what the release workflow needs.
  - Set an expiry: choose a short expiry window (30–90 days) for the PAT and rotate before expiry. Short lifetimes reduce exposure if a secret leaks.
  - Store secrets securely: add the token in **Settings → Secrets → Actions** as `RELEASE_PAT` (do not commit the token to source).
  - Optional environment protection: for extra control, attach `RELEASE_PAT` to a GitHub **Environment** that requires manual approval before the workflow can use the secret.

  Rotation & revocation process (safe workflow):

  1. Create a new PAT for the bot account (with the same minimal scopes).
  2. Update the repository secret `RELEASE_PAT` with the new token.
  3. Run a dry-run or a test release to verify the new token works (`npm run release:dry-run` or push a test branch and merge a PR).
  4. After verification, revoke the old PAT from the bot account.

  Monitoring & audits:

  - Periodically review PAT last-used timestamps and Actions logs for unusual activity.
  - Keep an inventory of active bot PATs and rotate them on a schedule.

  Incident response (if token is compromised):

  1. Revoke the compromised PAT immediately.
  2. Rotate the secret (`RELEASE_PAT`) with a newly created PAT and re-run verification.
  3. Audit recent Actions runs and git history for unauthorized changes; revert or delete malicious commits/releases/tags as needed.
  4. Consider revoking other tokens that may be related and investigate the cause.

  Notes:

  - If you later move this repo under an organization, prefer using a **GitHub App** (installation tokens, auto-rotation, scoped permissions) instead of a PAT where possible.
  - Keep the bot account credentials separate from personal accounts and document the owner/rotation schedule in the repo's maintainer notes.

- When you're ready to publish to npm, add `@semantic-release/npm` and configure an `NPM_TOKEN` repository secret; update the release job to provide `NPM_TOKEN` to the environment.
- Consider enforcing Conventional Commits with `commitlint` + `husky` or a CI check to ensure reliable release behavior.
- Update contributor docs to encourage Conventional Commit style for commit messages.

## Branching & PR process

- Use topic branches for features (`kevin/<feature>`). Create PRs against `main` with a clear description and tests. Tag PRs with `breaking` and `semver:major` when appropriate.

## Notes

- The codebase is ESM-only (`package.json` `type: module`). Keep imports using `.js` for local module paths (e.g., `import foo from './foo.js'`).
- CLI entrypoints preserve the shebangs and are listed under `bin` in `package.json`.
