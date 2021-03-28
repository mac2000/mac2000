const https = require('https')

const handler = (resolve, reject) => res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            resolve(JSON.parse(data))
        } catch(error) {
            reject(error)
        }
    })
}

const getJson = url => new Promise((resolve, reject) => https.get(url, handler(resolve, reject)))

const postJson = (url, body, headers) => new Promise((resolve, reject) => {
    options = {
        method: 'POST',
        headers
    }

    const req = https.request(url, options, handler(resolve, reject));

    req.write(JSON.stringify(body));
    req.end();
})

module.exports = {
    getJson,
    postJson
}