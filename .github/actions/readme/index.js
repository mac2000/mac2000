const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  //core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

  const content = fs.readFileSync('README.md', 'utf-8');
  console.log('README BEFORE', content);
  fs.writeFileSync('README.md', content + '\n\nHELLO FROM CUSTOM ACTION\n\n');
  const after = fs.readFileSync('README.md', 'utf-8');
  console.log('README AFTER', after);
} catch (error) {
  core.setFailed(error.message);
}