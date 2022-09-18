import axios from "axios"

const SET_NEWS = 'SET_NEWS'

const setNews = news => ({type: SET_NEWS, news})

export const getNews = async dispatch => {
  const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API_KEY_NEWSAPI}`)
  return dispatch(setNews(response.data.articles))
}

export default function(state = {}, action){
  switch (action.type) {
    case SET_NEWS:
      return action.news
    default: 
      return state
  }
}