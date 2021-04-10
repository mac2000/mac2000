const {icons} = require('./configs')

const languageIcons = languages => {
    languages = Object.keys(languages).map(key => ({
        key: key,
        ico: key in icons.languages ? icons.languages[key] : icons.fallback,
        val: languages[key]
    })).map(({key, ico, val}) => ({
        key: `<img src=${ico} width="24" height="24" alt="${key}" title=${key} />`,
        val: val
    })).reduce((obj, item) => Object.assign(obj, {[item.key]: item.val}), {})
    
    return languages
}

const platformIcons = platforms => {
    platforms = Object.keys(platforms).map(key => ({
        key: key,
        ico: key in icons.platforms ? icons.platforms[key] : icons.fallback,
        val: platforms[key]
    })).map(({key, ico, val}) => ({
        key: `<img src=${ico} width="24" height="24" alt="${key}" title=${key} />`,
        val: val
    })).reduce((obj, item) => Object.assign(obj, {[item.key]: item.val}), {})
    
    return platforms
}

const editorIcons = editors => {
    editors = Object.keys(editors).map(key => ({
        key: key,
        ico: key in icons.editors ? icons.editors[key] : icons.fallback,
        val: editors[key]
    })).map(({key, ico, val}) => ({
        key: `<img src=${ico} width="24" height="24" alt="${key}" title=${key} />`,
        val: val
    })).reduce((obj, item) => Object.assign(obj, {[item.key]: item.val}), {})
    
    return editors
}

module.exports = {
    platformIcons,
    editorIcons,
    languageIcons
}