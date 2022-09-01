import axios from "axios"

const SET_BLOGS = 'SET_BLOGS'
const PUBLISH_BLOG = 'PUBLISH_BLOG'

const setBlogs = blogs => ({type: SET_BLOGS, blogs})

export const getBlogs = async dispatch => {
  const response = await axios.get('/api/blogs')
  // const response = await axios.get('https://newsapi.org/v2/top-headlines', { 
  //   params: {
  //     'apiKey': process.env.REACT_APP_API_KEY_NEWSAPI,
  //     'country': 'us'
  //   }
  // })
  console.log(response)
  return dispatch(setBlogs(response.data))
}

export const postBlog = (title, description) => {
  return async (dispatch) => {
    console.log(title, description, window.localStorage.getItem('token'))
    const response = await axios.post('/api/blogs', 
      { title, description }, 
      {
        headers: { 
          authorization : window.localStorage.getItem('token')
        }
      }
    )
    const data = response.data
    return dispatch({type: PUBLISH_BLOG, blog: data})
  }
}

export const _postBlog = async blog => {
  return {
    type: PUBLISH_BLOG,
    blog
  }
}

export default function(state = {}, action){
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs
    case PUBLISH_BLOG:
      return action.blog
    default: 
      return state
  }
}