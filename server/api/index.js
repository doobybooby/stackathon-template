const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/blogs', require('./blogs'))
router.use('/replies', require('./replies'))
router.use('/news', require('./news'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
