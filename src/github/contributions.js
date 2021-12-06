import { writeFileSync } from 'fs'
import { markdownTable } from 'markdown-table'
import {octokit} from './octokit.js'

const query = `
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

export const contributions = token => octokit(token).graphql(query)
.then(res => {
  writeFileSync('assets/contributions.json', JSON.stringify(res, null, 4), 'utf-8')
  return res
})
.then(res => res?.search?.edges?.map(edge => [edge?.node?.repository?.nameWithOwner, `[${edge?.node?.title}](${edge?.node?.url})`]))
.then(rows => [['Repository', 'Contribution']].concat(rows))
.then(rows => markdownTable(rows))

// console.log(await contributions(process.env.GITHUB_PASSWORD))
