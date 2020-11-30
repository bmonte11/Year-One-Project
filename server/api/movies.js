const router = require('express').Router()
const {Movie} = require('../db/models')
module.exports = router

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
