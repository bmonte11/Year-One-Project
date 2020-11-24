const router = require('express').Router()
const {Movie} = require('../db/models')
module.exports = router

router.get('/search/?', async (req, res, next) => {
  try {
    console.log(req.params, 'req.params here!')
  } catch (err) {
    next(err)
  }
})

router.post('/search/:movie', async (req, res, next) => {
  try {
    const newMovie = await Movie.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    res.send(newMovie)
    console.log(newMovie, 'the newMovie route works!')
  } catch (err) {
    next(err)
  }
})
