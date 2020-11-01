const express = require('express')
const JokeController = require('./JokeController')
const CacheService = require('./cacheService')

const app = express()

const jokeController = new JokeController()
app.get('/', jokeController.get)
app.get('/page/:page', jokeController.getPage)

const cacheService = new CacheService()
app.delete('/cache', (req, res) => {
    cacheService.clear()
    return res.send('Clear')
})

module.exports = app