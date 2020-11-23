const router = require('express').Router()
module.exports = router

router.get('/search/?', async (req, res, next) => {
  try {
    console.log(req.params, 'req.params here!')
  } catch (err) {
    next(err)
  }
})
