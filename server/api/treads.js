const router = require('express').Router()
const { models: { Thread }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const treads = await Thread.findAll()
    res.json(treads)
  } catch (err) {
    next(err)
  }
})
