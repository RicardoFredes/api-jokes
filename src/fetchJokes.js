const CacheService = require('./cacheService')
require('universal-fetch')

const cacheService = new CacheService()

async function fetchOneJoke() {
    const page = Math.ceil(Math.random() * 134)
    const jokes = await fetchJokesByPage(page)
    const index = Math.ceil(Math.random() * jokes.length - 1)
    return jokes[index]
}

function fetchJokesByPage(page = 1) {
    return cacheService.use(`page-${page}`, async () => {
        const url = `https://www.osvigaristas.com.br/charadas/pagina${page}.html`
        const strHTML = await fetch(url).then(r => r.text())
        return extract(strHTML)
    })
}

function extract(strHTML) {
    const data = strHTML.match(/question">((.|\n)+?)<\/(.|\n)+?toggleable">((.|\n)+?)<\/span/g)
    let jokes = []
    for (let item of data) {
        const content = item.replace(/question">(.*)<\/(.|\n)+?toggleable">(.*)<\/span/g, '{"question": "$1", "answer": "$3"}')
        jokes.push(JSON.parse(content))
    }
    return jokes 
}

module.exports = {
    fetchJokesByPage,
    fetchOneJoke
}
