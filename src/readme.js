import {readFileSync} from 'fs'
import {stats} from './github/stats.js'
import {languages} from './github/languages.js'
import {contributions} from './github/contributions.js'
import {wakatime} from './wakatime.js'

export const readme = async (githubToken, wakatimeToken) => {
    let md = readFileSync(new URL('template.md', import.meta.url), 'utf-8')
    md = md.replace('`github-contributions`', await contributions(githubToken))
    md = md.replace('`github-stats`', await stats(githubToken))
    md = md.replace('`github-languages`', await languages(githubToken))
    const waka = await wakatime(wakatimeToken)
    md = md.replace('`wakatime-languages`', waka.languages)
    md = md.replace('`wakatime-editors`', waka.editors)
    md = md.replace('`wakatime-platforms`', waka.platforms)
    return md
}

// console.log(await readme(process.env.GITHUB_PASSWORD, process.env.WAKATIME_TOKEN))