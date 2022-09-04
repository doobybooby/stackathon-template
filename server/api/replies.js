const router = require('express').Router()
const { models: { Reply }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const replies = await Reply.findAll()
    res.json(replies)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const replies = await Reply.create(req.body)
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
        blogId:req.params.id
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
