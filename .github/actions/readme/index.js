const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const { wakatime } = require('./lib/wakatime')
const { stats, langs } = require('./lib/github')
const { table } = require('./lib/table')
const { languagesConfig, platformsConfig, editorsConfig, statisticsConfig } = require('./lib/configs')

try {
    const content = fs.readFileSync('README.md', 'utf-8')
    Promise.all([wakatime(), stats(), langs()]).then(([{languages, platforms, editors}, statistics, langs]) => {
        statistics = Object.keys(statistics).map(key => ({key, val: statistics[key]}))
        const modified = content
            .replace(/(<!-- wakatime languages start -->)[\s\S]*(<!-- wakatime languages end -->)/g, '$1\n' + table(languages, languagesConfig) + '\n$2')
            .replace(/(<!-- wakatime platforms start -->)[\s\S]*(<!-- wakatime platforms end -->)/g, '$1\n' + table(platforms, platformsConfig) + '\n$2')
            .replace(/(<!-- wakatime editors start -->)[\s\S]*(<!-- wakatime editors end -->)/g, '$1\n' + table(editors, editorsConfig) + '\n$2')
            .replace(/(<!-- github stats start -->)[\s\S]*(<!-- github stats end -->)/g, '$1\n' + table(statistics, statisticsConfig) + '\n$2')
            .replace(/(<!-- github langs start -->)[\s\S]*(<!-- github langs end -->)/g, '$1\n' + table(langs, languagesConfig) + '\n$2')
        console.log(modified)
        core.setOutput("readme", modified)
    })
} catch (error) {
    core.setFailed(error.message)
}