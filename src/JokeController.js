const { fetchOneJoke, fetchJokesByPage } = require('./fetchJokes')

class JokeController {
    
    async getPage(req, res) {
        const page = req.params.page
        const jokes = await fetchJokesByPage(page)
        return res.json(jokes)
    }

    async get(req, res) {
        const joke = await fetchOneJoke()
        if (!joke) {
            res.status(500)
            return  res.json({ error: 'Internal server error' })
        }
        return res.json(joke)
    }
}

module.exports = JokeController
