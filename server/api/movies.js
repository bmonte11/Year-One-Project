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

//Upvote
router.put('/:movie/upvote', async (req, res, next) => {
  console.log('are we hitting this put route?')
  try {
    const movieToUpdate = await Movie.findOne({
      where: {
        name: req.params.movie
      }
    })
    console.log(movieToUpdate, 'what is in newvalue')
    const incrementResult = await movieToUpdate.increment('thumbsUp', {
      by: 1
    })
    console.log(movieToUpdate, 'what is in newvalue')
    res.status(201).send(incrementResult)
  } catch (err) {
    next(err)
  }
})
