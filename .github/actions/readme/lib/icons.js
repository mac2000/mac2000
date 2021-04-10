const {icons} = require('./configs')



const platformIcons = platforms => {
    platforms = Object.keys(platforms).map(key => ({
        key: key,
        ico: key in icons.platforms ? icons.platforms[key] : icons.fallback,
        val: platforms[key]
    })).map(({key, ico, val}) => ({
        key: `<img src=${ico} width="24" height="24" alt="${val}" />`,
        val: val
    })).reduce((obj, item) => Object.assign(obj, {[item.key]: item.val}), {})
    
    return platforms
}

platformIcons({ Windows: '98.14%', Mac: '1.86%' })

module.exports = {
    platformIcons
}