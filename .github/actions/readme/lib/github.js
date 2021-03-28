const core = require('@actions/core')
const {postJson} = require('./http');

const query = async query => await postJson('https://api.github.com/graphql', { query }, {
    'Authorization': 'Bearer ' + core.getInput('github'),
    'User-Agent': 'ReadmeAction/1.0 (https://github.com/mac2000/mac2000/tree/main/.github/actions/readme)'
})

module.exports = {
    query
}