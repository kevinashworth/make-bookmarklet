---
'make-bookmarklet': patch
---

- **Add** changesets.
- **Remove** semantic-release.

This is my first changeset. Choosing `patch` as a cautious first step. I expect to use changesets manually for this changeset, and then figure out an automated workflow.

Here is additional text. I do not yet know what makes for a good "commit" message. I mean, "changeset" message. I guess I'm wondering about how to handle large chunks of text. Oh, well. Diving right in!

## Reference material - LLM output

Some stuff while dealing with trying to fix semantic-release errors. From https://github.com/copilot/c/5e0d4ac3-256b-4a40-8a2a-f153f31f1735

### stuff 1

semantic-release is overengineered for a simple repo. Here are lighter alternatives:

Option 2: Changesets (modern, lightweight)

Developers add .changeset files describing changes. On merge to main, a workflow automatically bumps versions and creates a PR. You review and merge the PR—that's it.

Install and init. Then add a workflow that runs on PR merges. Much simpler than semantic-release and plays nicely with branch protection.

### stuff 2

Here are the best resources for Option 2: Changesets

Official docs:
- https://github.com/changesets/changesets

Relevant quick-start guides:
- https://changesets.dev/guide/getting-started

Workflow guidance:
- https://changesets.dev/guide/automating

Why it fits your repo:
- It is far lighter than semantic-release
- It creates a PR-based release workflow, which matches your branch protection rules
- It does not require direct pushes to `main`
- It is designed for packages and small repos without the complexity of full release automation

Typical flow:
1. Install `@changesets/cli`
2. Run `npx changeset`
3. Describe the change
4. Merge the changeset PR
5. A workflow opens or updates a release PR
6. Merge the release PR to publish version bumps and tags

This is a much better match for a small repo than semantic-release.
