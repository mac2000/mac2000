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

const LANGUAGES_QUERY = `
{
    user(login: "mac2000") {
        repositories(ownerAffiliations: OWNER, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
                languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                    edges {
                        size
                        node {
                            color
                            name
                        }
                    }
                }
            }
        }
    }
}  
`

const CONTRIBUTIONS_QUERY = `
{
    search(query: "is:merged is:pr is:public archived:false author:mac2000", type: ISSUE, first: 10) {
        edges {
            node {
                ... on PullRequest {
                    title
                    url
                    repository {
                        nameWithOwner
                    }
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

const langs = async () => {
    const {data: {user: {repositories: {nodes}}}} = await query(LANGUAGES_QUERY)

    const repositories = nodes
        .map(({languages: { edges }}) => edges)
        .reduce((a,b) => a.concat(b), [])
        .map(({size, node: {name}}) => ({name, size}))

    const sums = repositories.map(({size}) => size).reduce((a, b) => a + b, 0)
        
    const percents = repositories
        .map(({name, size}) => ({ name, percent: size / sums * 100 }))
        .reduce((acc, x) => {
            const found = acc.find(i => i.name === x.name)
            
            if(found) {
                found.percent += x.percent
            } else {
                acc.push({ name: x.name, percent: x.percent })
            }
            return acc
        }, [])
        .map(({name, percent}) => ({name, percent: parseFloat(percent.toFixed(2))}))
        .sort((a,b) => (a.percent > b.percent) ? -1 : ((b.percent > a.percent) ? 1 : 0))

    const top5 = percents
        .splice(0, 5)
        .concat(percents.reduce((acc, x) => { acc.percent = parseFloat((acc.percent + x.percent).toFixed(2)); return acc; }, { name: 'Other', percent: 0.0 }))
        .filter(({ percent }) => !!percent)
        .map(({ name, percent }) => ({ name, percent }))

    return top5
}

const contributions = async () => {
    const {data: {search: { edges }}} = await query(CONTRIBUTIONS_QUERY)

    return edges.map(({node: {title, url, repository: {nameWithOwner}}}) => ({title, url, repo: nameWithOwner})).map(({title, url, repo}) => ({repo, pr: `[${title}](${url})`}))
}

module.exports = {
    query,
    stats,
    langs,
    contributions
}