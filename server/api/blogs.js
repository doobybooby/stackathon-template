const router = require('express').Router()
const { models: { Blog }} = require('../db')
const Reply = require('../db/models/Reply')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        Reply
      ]
    })
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})
