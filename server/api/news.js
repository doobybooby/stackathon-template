const router = require('express').Router()
const axios = require("axios")

module.exports = router

router.get('/', async(req, res, next) => {
  const response = await axios.get('https://newsapi.org/v2/top-headlines',{
    params: {
      'apiKey': process.env.REACT_APP_API_KEY_NEWSAPI,
      'country': 'us'
    }
  })
  console.log(response.data.articles[0].title)
  res.send(response.data)
})