const router = require('express').Router()
const { models: { Blog, Reply, User }} = require('../db')
const { isLoggedIn } = require('./middleware')

module.exports = router

router.delete('/', isLoggedIn, async (req, res, next) => {
  try {
    await Blog.destroy({
      where : {
        id: req.body.blog.id,
        userId: req.user.id
      }
    })
    res.sendStatus(204)
  }
  catch(err){
    next(err)
  }
})

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Reply.findAll({
      where: {
        blogId:req.params.id
      },
      include: [
        {
          model: User,
          attriutes: ['profileImage', 'username']
        }
      ]
    })
    res.json(comments)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        { 
          model: Reply,
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
    blog.update({ userId:req.user.id })
    res.send(blog)
  }
  catch(err){
    next(err)
  }
})

router.put('/rating', isLoggedIn, async (req,res, next)=> {
  const blog = await Blog.findOne({
    where: {
      id:req.body.blog.id
    }
  })
  await blog.update({ rating: req.body.rating })
  await blog.save()
  res.send(blog)
})

router.put('/', isLoggedIn, async (req, res, next) => {
  try {
    console.log('this is what i got from the back end', req.body)
    const blog = await Blog.findOne({
      where: {
        id: req.body.blog.id,
        userId: req.body.blog.userId
      }
    })
    await blog.update(req.body.blog)
    await blog.save()
    res.send(blog)
  }
  catch(err){
    next(err)
  }
})




