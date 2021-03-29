const assert = require('assert')
const { horizont } = require('./horizont')

const strip = str => str.replace(/^\s+/gm, '').trim()

describe('horizont', () => {
    it('should render', () => {
        const obj = {
            Windows: 95.82,
            Mac: 4.18
        }

        const expected = strip(`
        | Windows |  Mac  |
        | :-----: | :---: |
        |  95.82  |  4.18 |
        `)

        assert.strictEqual(horizont(obj), expected)
    })

    it('should render with small headers', () => {
        const obj = {
            A: 95.82,
            B: 4.18
        }

        const expected = strip(`
        |   A   |   B   |
        | :---: | :---: |
        | 95.82 |  4.18 |
        `)

        assert.strictEqual(horizont(obj), expected)
    })

    it('should render with small values', () => {
        const obj = {
            Hello: 1,
            World: 1
        }

        const expected = strip(`
        | Hello | World |
        | :---: | :---: |
        |   1   |   1   |
        `)

        assert.strictEqual(horizont(obj), expected)
    })

    it('should render cross from left', () => {
        const obj = {
            Hello: 1,
            A: 'World'
        }

        const expected = strip(`
        | Hello |   A   |
        | :---: | :---: |
        |   1   | World |
        `)

        assert.strictEqual(horizont(obj), expected)
    })

    it('should render cross from right', () => {
        const obj = {
            A: 'Hello',
            World: 2
        }

        const expected = strip(`
        |   A   | World |
        | :---: | :---: |
        | Hello |   2   |
        `)

        assert.strictEqual(horizont(obj), expected)
    })
})