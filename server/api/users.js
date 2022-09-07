const router = require('express').Router()
const { models: { User }} = require('../db')
const { isLoggedIn } = require('./middleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', isLoggedIn, async( req, res, next) => {
  try{
    console.log('------req.body -------', req.body)
    const user = await User.findOne({
      where: {
        id:req.user.id
      }
    })
    // console.log('made it to teh back end, ', user.username, req.body)
    await user.update(req.body)
    await user.save()
    res.json(user)
  }
  catch(err){
    next(err)
  }
})