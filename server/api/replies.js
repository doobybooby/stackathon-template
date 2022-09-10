const router = require('express').Router()
const { models: { Reply, User }} = require('../db')
const { isLoggedIn } = require('./middleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const replies = await Reply.findAll({
      include: [
        {
          model: User,
          attriutes: ['profileImage', 'username']
        }
      ]
    })
    res.json(replies)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const replies = await Reply.findAll({
      where: {
        replyId : req.params.id
      },
      include: [
        {
          model: User,
          attriutes: ['profileImage', 'username']
        }
      ]
    })
    res.json(replies)
  } catch (err) {
    next(err)
  }
})

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const replies = await Reply.create(req.body)
    console.log('adding a comment/thread ', req.user)
    await replies.update({userId: req.user.id})
    await replies.save()
    res.json(replies)
  } 
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const replies = await Reply.findOne({
      where: {
        replyId:req.params.id
      }
    })
    await replies.update(req.body)
    await replies.save()
    res.json(replies)
  } 
  catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Reply.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(204)
  } 
  catch (err) {
    next(err)
  }
})
