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
            .replace(/(<!-- wakatime languages start -->)[\s\S]*(<!-- wakatime languages end -->)/g, '$1\n' + table(languages, languagesConfig) + '\n$2')
            .replace(/(<!-- wakatime platforms start -->)[\s\S]*(<!-- wakatime platforms end -->)/g, '$1\n' + table(platforms, platformsConfig) + '\n$2')
            .replace(/(<!-- wakatime editors start -->)[\s\S]*(<!-- wakatime editors end -->)/g, '$1\n' + table(editors, editorsConfig) + '\n$2')
        console.log(modified)
        core.setOutput("readme", modified)
    })
} catch (error) {
    core.setFailed(error.message)
}