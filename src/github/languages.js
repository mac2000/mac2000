import { markdownTable } from 'markdown-table'
import {octokit} from './octokit.js'
import {icon} from '../utils/icons.js'

const query = `
{
    user(login: "mac2000") {
        repositories(ownerAffiliations: OWNER, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes {
                languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }
    }
}
`

export const languages = token => octokit(token).graphql(query)
.then(res => res?.user?.repositories?.nodes)
.then(nodes => nodes?.map(node => node?.languages?.edges))
.then(edges => edges?.reduce((acc, x) => acc.concat(x), []))
.then(edges => edges?.map(edge => edge?.node?.name))
.then(percentage(2, 10))
.then(languages => languages.map((cells, index) => index === 0 ? cells.map(cell => icon('languages', cell)) : cells))
.then(languages => markdownTable(languages, {align: languages[0].map(() => 'c')}))

export const percentage = (min, limit) => arr => Object
    .entries(arr.reduce((acc, x) => Object.assign(acc, {[x]: (acc[x] || 0) + 1}), {}))
    .sort((a, b) => b[1] - a[1])
    .map(entry => [entry[0], parseFloat((entry[1]/arr.length*100).toFixed(2))])
    .filter(entry => entry[1] > min)
    .splice(0, limit)
    .reduce((acc, x) => {
        acc[0].push(x[0])
        acc[1].push(x[1] + '%')
        return acc
    }, [[], []])

// console.log(await languages(process.env.GITHUB_PASSWORD))
