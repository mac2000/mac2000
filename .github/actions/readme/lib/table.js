const table = (arr, cfg) => {
    if (!arr.length || !Object.keys(cfg).length) {
        return ''
    }
    
    cfg = Object.keys(cfg)
        .map(key => ({
            key,
            max: Math.max(cfg[key].name.length, Math.max.apply(null, arr.map(item => (cfg[key].digits ? item[key].toFixed(cfg[key].digits).length : item[key].toString().length) + (cfg[key].postfix ? cfg[key].postfix.length : 0))))
        }))
        .reduce((acc, x) => Object.assign(acc, {[x.key]: Object.assign({}, cfg[x.key], {max: x.max})}), {})
    
    const lines = arr.map(item => Object.keys(cfg).map(key => {
        const str = (cfg[key].digits ? item[key].toFixed(cfg[key].digits) : item[key].toString()) + (cfg[key].postfix ? cfg[key].postfix : '')
        return cfg[key].alignRight ? str.padStart(cfg[key].max) : str.padEnd(cfg[key].max)
    })).map(xx => `| ${xx.join(' | ')} |`)


    const header = '| ' + Object.keys(cfg).map(key => cfg[key].name.padEnd(cfg[key].max)).join(' | ') + ' |'
    const divider = '| ' + Object.keys(cfg).map(key => '-'.padEnd(cfg[key].max -1, '-') + (cfg[key].alignRight ? ':' : '-')).join(' | ') + ' |'

    lines.unshift(divider)
    lines.unshift(header)

    return lines.join('\n')
}

module.exports = {
    table
}