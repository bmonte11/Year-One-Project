const router = require('express').Router()
const {Movie} = require('../db/models')
module.exports = router

router.get('/:movie', async (req, res, next) => {
  console.log(req.params, 'req.params here')
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
    // console.log(movie, "this is what we're sending in the get route")
    res.send(movie)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  console.log('are we hitting the post route?')
  try {
    const newMovie = await Movie.create(req.body)
    res.status(201).send(newMovie)
    console.log(newMovie, 'the newMovie route works!')
  } catch (err) {
    next(err)
  }
})
