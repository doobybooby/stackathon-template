const router = require('express').Router()
const { models: { Blog }} = require('../db')
const Reply = require('../db/models/Reply')
const Thread = require('../db/models/Thread')
const { isLoggedIn } = require('./middleware')

module.exports = router

router.get('/', async (req, res, next) => {
  try {



    const blogs = await Blog.findAll({
      include: [
        { 
          model: Reply, 
          include: { model: Thread }
        }
      ]
    })
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    res.send(blog)
  }
  catch(err){
    next(err)
  }
})
