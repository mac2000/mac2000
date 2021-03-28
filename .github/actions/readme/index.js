const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const { wakatime } = require('./lib/wakatime')
const { table } = require('./lib/table')

const percent = {
    name: '%',
    alignRight: true,
    digits: 2,
    postfix: '%'
}

const languagesConfig = {
    percent,
    name: {
        name: 'Language'
    }
}

const platformsConfig = {
    percent,
    name: {
        name: 'Platform'
    }
}

const editorsConfig = {
    percent,
    name: {
        name: 'Editors'
    }
}

try {
    const content = fs.readFileSync('README.md', 'utf-8')
    wakatime().then(({languages, platforms, editors}) => {
        const modified = content
            .replace(/<!-- wakatime languages start -->[\s\S]*<!-- wakatime languages end -->/g, table(languages, languagesConfig))
            .replace(/<!-- wakatime platforms start -->[\s\S]*<!-- wakatime platforms end -->/g, table(platforms, platformsConfig))
            .replace(/<!-- wakatime editors start -->[\s\S]*<!-- wakatime editors end -->/g, table(editors, editorsConfig))
        console.log(modified)
        core.setOutput("readme", modified)
    })
} catch (error) {
    core.setFailed(error.message)
}