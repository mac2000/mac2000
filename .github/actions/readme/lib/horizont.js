const horizont = obj => Object
    .entries(obj)
    .map(([key, val]) => {
        key = key.toString()
        val = val.toString()
        let max = Math.max(key.length, val.length)
        max = max % 2 === 0 ? max + 1 : max
        key = key.padStart(max - Math.floor((max - key.length) / 2)).padEnd(max)
        val = val.padStart(max - Math.floor((max - val.length) / 2)).padEnd(max)
        div = ':' + '-'.padStart(max - 2, '-') + ':'
        return [key, div, val]
    })
    .reduce((acc, x) => {
        acc[0].push(x[0])
        acc[1].push(x[1])
        acc[2].push(x[2])
        return acc
    }, [[], [], []])
    .map(cells => '| ' + cells.join(' | ') + ' |')
    .join("\n")


module.exports = {
    horizont
}