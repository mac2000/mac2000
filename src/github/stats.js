import { writeFileSync } from 'fs'
import { markdownTable } from 'markdown-table'
import {octokit} from './octokit.js'
import {icon} from '../utils/icons.js'

const query = `
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

export const stats = token => octokit(token).graphql(query)
.then(res => {
  writeFileSync('assets/stats.json', JSON.stringify(res, null, 4), 'utf-8')
  return res
})
.then(res => [[
    res?.user?.repositoriesContributedTo?.totalCount,
    res?.user?.contributionsCollection?.totalCommitContributions,
    res?.user?.issues?.totalCount,
    res?.user?.followers?.totalCount,
    res?.user?.repositoriesContributedTo?.totalCount,
]])
.then(rows => [[icon('stats', 'requests'), icon('stats', 'commits'), icon('stats', 'issues'), icon('stats', 'stars'), icon('stats', 'contributions')]].concat(rows))
.then(rows => markdownTable(rows, {align: ['c', 'c', 'c', 'c', 'c']}))

// console.log(await stats(process.env.GITHUB_PASSWORD))
