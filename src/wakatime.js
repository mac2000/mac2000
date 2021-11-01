import axios from 'axios'
import axiosRetry from 'axios-retry'
import {icon} from './utils/icons.js'
import {readFileSync} from 'fs'
import { markdownTable } from 'markdown-table'

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay })

export const wakatime = token => axios
    .get(`https://wakatime.com/api/v1/users/mac/stats/last_30_days?api_key=${token}`)
    .then(response => response?.data?.data)
    .then(data => ({
        platforms: map(data?.operating_systems, 1, 10, 'platforms'),
        editors: map(data?.editors, 1, 10, 'editors'),
        languages: map(data?.languages, 1, 10, 'languages'),
    }))
    .then(data => ({
        platforms: data.platforms.map((cells, index) => index === 0 ? cells.map(cell => icon('platforms', cell)) : cells),
        editors: data.editors.map((cells, index) => index === 0 ? cells.map(cell => icon('editors', cell)) : cells),
        languages: data.languages.map((cells, index) => index === 0 ? cells.map(cell => icon('languages', cell)) : cells),
    }))
    .then(data => ({
        platforms: markdownTable(data.platforms, {align: data.platforms[0].map(() => 'c')}),
        editors: markdownTable(data.editors, {align: data.editors[0].map(() => 'c')}),
        languages: markdownTable(data.languages, {align: data.languages[0].map(() => 'c')}),
    }))


const map = (items, min, limit) => items
    .map(item => ({name: item?.name, percent: item?.percent}))
    .filter(item => item?.percent > min)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, limit)
    .reduce((acc, x) => {
        acc[0].push(x.name)
        acc[1].push(x.percent.toFixed(2) + '%')
        return acc
    }, [[], []])
    

// wakatime(process.env.WAKATIME_TOKEN).then(d => Object.keys(d).forEach(k => console.log(d[k] + '\n\n')))