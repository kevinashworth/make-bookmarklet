#!/usr/bin/env sh
set -eu

if [ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then
  echo "release:dry-run:main must be run on main."
  exit 1
fi

npm install --no-save \
  semantic-release@25 \
  @semantic-release/commit-analyzer \
  @semantic-release/release-notes-generator \
  @semantic-release/changelog \
  @semantic-release/git \
  @semantic-release/github \
  conventional-changelog-conventionalcommits

GITHUB_TOKEN="${GITHUB_TOKEN:-${RELEASE_PAT:-${GH_TOKEN:-}}}"
GH_TOKEN="${GH_TOKEN:-${GITHUB_TOKEN:-${RELEASE_PAT:-}}}"

if [ -z "${GITHUB_TOKEN}" ]; then
  echo "Missing token: set RELEASE_PAT (or GITHUB_TOKEN/GH_TOKEN) before running release:dry-run:main."
  exit 1
fi

export GITHUB_TOKEN
export GH_TOKEN

npx semantic-release@25 --dry-run
