const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const { wakatime } = require('./lib/wakatime')
const { query } = require('./lib/github')
const { table } = require('./lib/table')
const { languagesConfig, platformsConfig, editorsConfig } = require('./lib/configs')

const q = `
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
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
        totalCount
        nodes {
          stargazers {
            totalCount
          }
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

try {
    const content = fs.readFileSync('README.md', 'utf-8')
    query(q).then(console.log).then(() => {
        wakatime().then(({languages, platforms, editors}) => {
            const modified = content
                .replace(/(<!-- wakatime languages start -->)[\s\S]*(<!-- wakatime languages end -->)/g, '$1\n' + table(languages, languagesConfig) + '\n$2')
                .replace(/(<!-- wakatime platforms start -->)[\s\S]*(<!-- wakatime platforms end -->)/g, '$1\n' + table(platforms, platformsConfig) + '\n$2')
                .replace(/(<!-- wakatime editors start -->)[\s\S]*(<!-- wakatime editors end -->)/g, '$1\n' + table(editors, editorsConfig) + '\n$2')
            console.log(modified)
            core.setOutput("readme", modified)
        })
    })
} catch (error) {
    core.setFailed(error.message)
}