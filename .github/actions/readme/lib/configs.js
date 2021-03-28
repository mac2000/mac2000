const percent = {
    name: '%',
    alignRight: true,
    digits: 2,
    postfix: '%'
}

const languagesConfig = {
    percent,
    name: {
        name: 'Language'
    }
}

const platformsConfig = {
    percent,
    name: {
        name: 'Platform'
    }
}

const editorsConfig = {
    percent,
    name: {
        name: 'Editors'
    }
}

const statisticsConfig = {
    key: {
        name: 'Stats'
    },
    val: {
        name: ' ',
        alignRight: true
    }
}

module.exports = {
    languagesConfig,
    platformsConfig,
    editorsConfig,
    statisticsConfig
}