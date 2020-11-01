const createHtmlDom = require('htmldom')
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
        const str = await fetch(url).then(r => r.text())
        try {
            const $ = createHtmlDom(str)
            let jokes = []
            $('article').each((_, joke) => {
                try {
                    const question = $(joke).find('.question')[0].children[0].data
                    const answer = $(joke).find('.answer > .toggleable')[0].children[0].data
                    jokes.push({ question, answer })
                } catch {}
            })
            return jokes
        } catch {
            return []
        }
    })
}

module.exports = {
    fetchJokesByPage,
    fetchOneJoke
}
