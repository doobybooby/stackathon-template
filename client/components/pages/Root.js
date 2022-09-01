import React from 'react'
import axios from 'axios'
export const Root = () => {

  const fetchNewsApi = async()=> {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', { 
      params: {
        'apiKey': process.env.REACT_APP_API_KEY_NEWSAPI,
        'country': 'us'
      }
    })
  }
  fetchNewsApi()

  return (
    <div>
      ROOTS
    </div>
  )
}
