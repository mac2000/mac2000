const core = require('@actions/core')
const { getJson } = require('./http')

const key = process.env ? process.env.WAKATIME_API_KEY : core.getInput('wakatime')

const process = items => items
    .splice(0, 5)
    .concat(
        items
            .reduce((acc, x) => { acc.percent = parseFloat((acc.percent + x.percent).toFixed(2)); return acc; }, { name: 'Other', percent: 0.0 }))
    .filter(({ percent }) => !!percent
    )
    .map(({ name, percent }) => ({ name, percent }))

const wakatime = async () => await getJson(`https://wakatime.com/api/v1/users/mac/stats/last_30_days?api_key=${key}`).then(({ data }) => ({
    languages: process(data.languages),
    platforms: process(data.operating_systems),
    editors: process(data.editors),
}))

module.exports = {
    wakatime
}