const core = require('@actions/core')
const {postJson} = require('./http');

const STATS_QUERY = `
{
    user(login: "mac2000") {
        contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
        }
        repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
        }
        pullRequests(first: 1) {
            totalCount
        }
        issues(first: 1) {
            totalCount
        }
        followers {
            totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: { direction: DESC, field: STARGAZERS }) {
            totalCount
            nodes {
                stargazers {
                    totalCount
                }
            }
        }
    }
} 
`

const query = async query => await postJson('https://api.github.com/graphql', { query }, {
    'Authorization': 'Bearer ' + core.getInput('github'),
    'User-Agent': 'ReadmeAction/1.0 (https://github.com/mac2000/mac2000/tree/main/.github/actions/readme)'
})

const stats = async () => {
    const {data: {user}} = await query(STATS_QUERY)

    return {
        requests: user.pullRequests.totalCount,
        commits: user.contributionsCollection.totalCommitContributions + user.contributionsCollection.restrictedContributionsCount,
        issues:  user.issues.totalCount,
        stars: user.repositories.nodes.reduce((acc, x) => acc + x.stargazers.totalCount, 0),
        contributions: user.repositoriesContributedTo.totalCount,
    };
}

module.exports = {
    query,
    stats
}