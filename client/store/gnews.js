
import axios from "axios"

const SET_GNEWS = 'SET_GNEWS'

const setGNews = news => ({type: SET_GNEWS, news})

export const getGNews = async dispatch => {
  // const gnewsResponse = await axios.get('https://gnews.io/api/v4/top-headlines?token=5b82dc3351275789800574df6999a95f&lang=en')
  const gnewsResponse = await axios.get(`https://gnews.io/api/v4/top-headlines?token=${process.env.REACT_APP_GNEWS_API}&lang=en`)
  console.log(gnewsResponse.data)
  // const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API_KEY_NEWSAPI}`)
  return dispatch(setGNews(gnewsResponse.data.articles))
}

export default function(state = [], action){
  switch (action.type) {
    case SET_GNEWS:
      return action.news
    default: 
      return state
  }
}