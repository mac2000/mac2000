import {Octokit} from '@octokit/rest'

export const octokit = token => new Octokit({
    auth: token,
    userAgent: 'ReadmeAction/1.0 (https://github.com/mac2000/mac2000)'
})