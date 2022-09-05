import axios from "axios"

const SET_BLOGS = 'SET_BLOGS'
const PUBLISH_BLOG = 'PUBLISH_BLOG'
const UPDATE_BLOG = 'UPDATE_BLOG'

const setBlogs = blogs => ({type: SET_BLOGS, blogs})

export const getBlogs = async dispatch => {
  const response = await axios.get('/api/blogs')
  return dispatch(setBlogs(response.data))
}

export const updateBlogRating = (blog, diff) => {
  return async (dispatch, getState) => {
    console.log('----getState----', getState())
    const response = await axios.put(`/api/blogs/${blog.id}`, { rating: blog.rating + diff  }, { headers: { authorization: window.localStorage.getItem('token') }})
    getBlogs(dispatch)
  }
}

export const postBlog = (title, description) => {
  return async (dispatch) => {
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

export default function(state = [], action){
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs
    case PUBLISH_BLOG:
      return action.blog
    case UPDATE_BLOG:
      return state.find(blog => blog.id===action.blog.id)
    default: 
      return state
  }
}