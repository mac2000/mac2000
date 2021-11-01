import {writeFileSync} from 'fs'
import {readme} from './src/readme.js'

const md = await readme(process.env.GITHUB_TOKEN, process.env.WAKATIME_TOKEN)

writeFileSync('README.md', md, 'utf-8')