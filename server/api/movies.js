const router = require('express').Router()
const axios = require('axios')
const {Movie} = require('../db/models')
module.exports = router

//Search for a film
router.get('/search/:input', async (req, res, next) => {
  const options = {
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: req.params.input, page: '1', r: 'json', type: 'movie'},
    headers: {
      'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    }
  }
  let response = await axios.request(options)
  try {
    res.send(response.data.Search)
    console.log(response.data.Search, "here's the response from the new route")
  } catch (err) {
    next(err)
  }
})

router.get('/:movie', async (req, res, next) => {
  try {
    const movie = await Movie.findOrCreate({
      where: {
        name: req.params.movie
      },
      defaults: {
        thumbsUp: 0,
        thumbsDown: 0
      }
    })
    res.send(movie)
  } catch (err) {
    next(err)
  }
})

//Upvote
router.put('/:movie/upvote', async (req, res, next) => {
  try {
    const movieToUpdate = await Movie.findOne({
      where: {
        name: req.params.movie
      }
    })
    const incrementResult = await movieToUpdate.increment('thumbsUp', {
      by: 1
    })
    res.status(201).send(incrementResult)
  } catch (err) {
    next(err)
  }
})

router.put('/:movie/downvote', async (req, res, next) => {
  try {
    const movieToUpdate = await Movie.findOne({
      where: {
        name: req.params.movie
      }
    })
    const decrementResult = await movieToUpdate.increment('thumbsDown', {
      by: 1
    })
    res.status(201).send(decrementResult)
  } catch (err) {
    next(err)
  }
})
