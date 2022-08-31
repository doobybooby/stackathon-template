const router = require('express').Router()
const { models: { Reply }} = require('../db')
const Thread = require('../db/models/Thread')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const replies = await Reply.findAll({
      include: [
        Thread
      ]
    })
    res.json(replies)
  } catch (err) {
    next(err)
  }
})
