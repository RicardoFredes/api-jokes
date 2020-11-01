const express = require('express')
const cors = require('cors')
const JokeController = require('./JokeController')
const CacheService = require('./cacheService')
require('universal-fetch')

const app = express()

app.use(cors())

const jokeController = new JokeController()
app.get('/', jokeController.get)
app.get('/page/:page', jokeController.getPage)

const cacheService = new CacheService()
app.delete('/cache', (req, res) => {
    cacheService.clear()
    return res.send('Clear')
})

module.exports = app