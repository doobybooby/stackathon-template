const router = require('express').Router()
const { models: { Blog, Reply, Thread, User }} = require('../db')
const { isLoggedIn } = require('./middleware')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        { 
          model: Reply,
          include: { model: Thread }
        }, {
          model: User,
          attributes: ['profileImage', 'username']
        }
      ]
    })
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        id: req.params.id
      },
      include: [
        { 
          model: Reply, 
          include: { model: Thread }
        } ,{
          model: User,
          attributes: ['profileImage', 'username']
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

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id:req.params.id
      }
    })

    await blog.update(req.body)
    await blog.save()
    res.send(blog)
  }
  catch(err){
    next(err)
  }
})

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    await Blog.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send(204)
  }
  catch(err){
    next(err)
  }
})


