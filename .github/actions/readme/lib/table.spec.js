const assert = require('assert')
const {table} = require('./table')

const strip = str => str.replace(/^\s+/gm, '').trim()

describe('table', () => {
    const arr = [
        { name: 'Windows', percent: 95.82 },
        { name: 'Mac', percent: 4.18 }
    ]

    const cfg = {
        percent: {
            name: '%',
            alignRight: true,
            digits: 2,
            postfix: '%'
        },
        name: {
            name: 'Platform'
        }
    }

    it('should return empty string if there is no data', () => {
        const expected = ''
        const actual = table([], {})
        assert.strictEqual(actual, expected)
    })

    it('should return table', () => {
        const expected = strip(`
        | %      | Platform |
        | -----: | -------- |
        | 95.82% | Windows  |
        |  4.18% | Mac      |
        `)

        assert.strictEqual(table(arr, cfg), expected)
    })

    it('should choose max value for column width', () => {
        const opt = {
            ...cfg,
            name: {
                name: 'OS'
            }
        }

        const expected = strip(`
        | %      | OS      |
        | -----: | ------- |
        | 95.82% | Windows |
        |  4.18% | Mac     |
        `)

        const actual = table(arr, opt)

        assert.strictEqual(actual, expected)
    })

    it('should align text', () => {
        const opt = {
            percent: {
                name: 'Percent',
                alignRight: true,
                digits: 2,
                postfix: '%'
            },
            name: {
                name: 'Platform',
                alignRight: true
            }
        }

        const expected = strip(`
        | Percent | Platform |
        | ------: | -------: |
        |  95.82% |  Windows |
        |   4.18% |      Mac |
        `)

        const actual = table(arr, opt)
        assert.strictEqual(actual, expected)
    })

    it('should use keys if name not given', () => {
        const opt = {
            percent: {
            },
            name: {
            }
        }

        const expected = strip(`
        | percent | name    |
        | ------- | ------- |
        | 95.82   | Windows |
        | 4.18    | Mac     |
        `)

        const actual = table(arr, opt)
        assert.strictEqual(actual, expected)
    })
})