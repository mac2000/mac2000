const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const { wakatime } = require('./lib/wakatime')

try {
    console.log('CONTEXT', github.context)
    wakatime().then(console.log)
    const content = fs.readFileSync('README.md', 'utf-8')
    const modified = content + `\n\nHELLO FROM CUSTOM ACTION\n\n`
    console.log('README', modified)
    core.setOutput("readme", modified)
} catch (error) {
    core.setFailed(error.message)
}