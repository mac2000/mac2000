const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const { wakatime } = require('./lib/wakatime')
const { stats, langs, contributions } = require('./lib/github')
const { table } = require('./lib/table')
const { horizont } = require('./lib/horizont')
const { languagesConfig, platformsConfig, editorsConfig, statisticsConfig, contributionsConfig } = require('./lib/configs')
const { platformIcons, editorIcons, languageIcons } = require('./lib/icons')

try {
    const content = fs.readFileSync('README.md', 'utf-8')
    Promise.all([wakatime(), stats(), langs(), contributions()]).then(([{languages, platforms, editors}, statistics, langs, prs]) => {
        languages = Object.values(languages).reduce((acc, x) => Object.assign(acc, {[x.name]: x.percent + '%'}), {})
        platforms = Object.values(platforms).reduce((acc, x) => Object.assign(acc, {[x.name]: x.percent + '%'}), {})
        editors = Object.values(editors).reduce((acc, x) => Object.assign(acc, {[x.name]: x.percent + '%'}), {})
        langs = Object.values(langs).reduce((acc, x) => Object.assign(acc, {[x.name]: x.percent + '%'}), {})

        platforms = platformIcons(platforms)
        editors = editorIcons(editors)
        languages = languageIcons(languages)
        langs = languageIcons(langs)

        const modified = content
            .replace(/(<!-- wakatime languages start -->)[\s\S]*(<!-- wakatime languages end -->)/g, '$1\n' + horizont(languages) + '\n$2')
            .replace(/(<!-- wakatime platforms start -->)[\s\S]*(<!-- wakatime platforms end -->)/g, '$1\n' + horizont(platforms) + '\n$2')
            .replace(/(<!-- wakatime editors start -->)[\s\S]*(<!-- wakatime editors end -->)/g, '$1\n' + horizont(editors) + '\n$2')
            .replace(/(<!-- github stats start -->)[\s\S]*(<!-- github stats end -->)/g, '$1\n' + horizont(statistics) + '\n$2')
            .replace(/(<!-- github langs start -->)[\s\S]*(<!-- github langs end -->)/g, '$1\n' + horizont(langs) + '\n$2')
            .replace(/(<!-- github contributions start -->)[\s\S]*(<!-- github contributions end -->)/g, '$1\n' + table(prs, contributionsConfig) + '\n$2')
        console.log(modified)
        core.setOutput("readme", modified)
    })
} catch (error) {
    core.setFailed(error.message)
}