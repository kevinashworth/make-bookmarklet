import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import semver from 'semver';

const require = createRequire(import.meta.url);
const { analyzeCommits } = require('@semantic-release/commit-analyzer');

function run (cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function getLastTag () {
  try {
    return run('git describe --tags --abbrev=0');
  } catch {
    return null;
  }
}

function getCommits (range) {
  const format = '%H%x1f%B%x1e';
  const output = run(`git log ${range} --pretty=format:${format}`);

  if (!output) return [];

  return output
    .split('\x1e')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [hash, ...messageParts] = entry.split('\x1f');
      return {
        hash,
        message: messageParts.join('\x1f').trim()
      };
    })
    .filter((commit) => commit.message.length > 0);
}

function getCurrentVersion () {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  return pkg.version;
}

const lastTag = getLastTag();
const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
const commits = getCommits(range);
const currentVersion = getCurrentVersion();

if (commits.length === 0) {
  console.log('No commits found in range; no release expected.');
  process.exit(0);
}

const releaseType = await analyzeCommits(
  { preset: 'conventionalcommits' },
  {
    commits,
    logger: {
      log: () => { },
      error: () => { }
    }
  }
);

if (!releaseType) {
  console.log('Prediction: no new release (no release-worthy commits).');
  process.exit(0);
}

const nextVersion = semver.valid(currentVersion) ? semver.inc(currentVersion, releaseType) : null;

if (nextVersion) {
  console.log(`Prediction: ${releaseType} release (from ${currentVersion} to ${nextVersion}).`);
} else {
  console.log(`Prediction: ${releaseType} release.`);
}

console.log(lastTag ? `Analyzed commits since ${lastTag}.` : 'Analyzed full commit history (no tag found).');
