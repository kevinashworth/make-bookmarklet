#!/usr/bin/env sh
set -eu

npm install --no-save \
  semantic-release@25 \
  @semantic-release/commit-analyzer \
  conventional-changelog-conventionalcommits \
  semver

node ./scripts/release-dry-run-feature.mjs
