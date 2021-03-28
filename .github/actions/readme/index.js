const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const content = fs.readFileSync('README.md', 'utf-8');
  const modified = content + `\n\nHELLO FROM CUSTOM ACTION with ' and " quotes\n\n`;
  console.log('README', modified);
  core.setOutput("readme", modified);
} catch (error) {
  core.setFailed(error.message);
}