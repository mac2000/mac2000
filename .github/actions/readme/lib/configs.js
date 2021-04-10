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

const contributionsConfig = {
    repo: {
        name: 'Repository'
    },
    pr: {
        name: 'Contribution'
    }
}

const icons = {
    languages: {
        'Java': 'https://upload.wikimedia.org/wikipedia/ru/3/39/Java_logo.svg',
        'C#': 'https://upload.wikimedia.org/wikipedia/commons/a/a3/.NET_Logo.svg',
        'JavaScript': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
        'Markdown': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg',
        'YAML': 'https://upload.wikimedia.org/wikipedia/commons/6/63/YAML_logo_in_SVG_format.svg',
        'TypeScript': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
        'HTML': 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
        'JSON': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/JSON_vector_logo.svg',
        'Bash': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg',
        'Python': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
        'SQL': 'https://symbols.getvecta.com/stencil_28/61_sql-database-generic.a9f12e2a30.svg',
        'Groovy': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Groovy-logo.svg',
        'PHP': 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg',
        'XML': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Xml_logo.svg',
        'CSS': 'https://ru.wikipedia.org/wiki/CSS#/media/%D0%A4%D0%B0%D0%B9%D0%BB:CSS3_logo_and_wordmark.svg',
        'GraphQL': 'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg',
        'Go': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg',
        'Git': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg',
        'JSX': 'https://ru.wikipedia.org/wiki/React#/media/%D0%A4%D0%B0%D0%B9%D0%BB:React-icon.svg',
        'Kotlin': 'https://upload.wikimedia.org/wikipedia/commons/0/06/Kotlin_Icon.svg',
        'Haskell': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg',
        'Swift': 'https://cdn.worldvectorlogo.com/logos/swift-15.svg',
    },
    fallback: 'https://www.svgrepo.com/show/149905/txt-file-symbol.svg',
    editors: {
        'VS Code': 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg',
        'IntelliJ': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/IntelliJ_IDEA_Icon.svg',
        'Chrome': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg',
        'Android Studio': 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Breezeicons-apps-48-android-studio.svg',
        'Rider': 'https://www.jetbrains.com/dotnet/promo/unity/img/rider-text.svg',
        'Browser': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg',
    },
    platforms: {
        'Mac': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        'Windows': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Windows_logo_-_2012_derivative.svg',
        'Linux': 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
    },
    stats: {
        'requests': 'assets/icons/pullrequest.svg',
        'commits': 'assets/icons/commit.svg',
        'issues': 'assets/icons/issue.svg',
        'stars': 'assets/icons/start.svg',
        'contributions': 'assets/icons/merge.svg',
    }
}

module.exports = {
    languagesConfig,
    platformsConfig,
    editorsConfig,
    statisticsConfig,
    contributionsConfig,
    icons
}