import axios from "axios"

const SET_BLOGS = 'SET_BLOGS'
const PUBLISH_BLOG = 'PUBLISH_BLOG'
const UPDATE_BLOG = 'UPDATE_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'
const UPDATE_RATING = 'UPDATE_RATING'

const setBlogs = blogs => ({type: SET_BLOGS, blogs})

export const getBlogs = async dispatch => {
  const response = await axios.get('/api/blogs')
  return dispatch(setBlogs(response.data))
}

export const updateBlogRating = (blog, diff) => {
  return async (dispatch, getState) => {
    const response = await axios.put(`/api/blogs/rating`, 
      { 
        blog, 
        rating: blog.rating + diff  },
      { 
        headers: { 
          authorization: window.localStorage.getItem('token') 
        }
      }
    )
    getBlogs(dispatch)
  }
}

export const deleteBlog = ( blog ) => {
  return async (dispatch ) => {
    const response = await axios.delete('/api/blogs', {
        headers: { 
          authorization : window.localStorage.getItem('token')
        },
        data: {
          blog
        }
      }, 
    )
    const data = response.data
    dispatch({ type:DELETE_BLOG, blog:data })
    getBlogs(dispatch)
  }
}

export const postBlog = (title, description, file, articleUrl) => {
  return async (dispatch) => {
    const response = await axios.post('/api/blogs', 
      { title, description, image:file, articleUrl }, 
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

export const modifyBlog = (blog) => {
  console.log('edit ths please', blog)
  return async dispatch => {
    const response = await axios.put(`/api/blogs`, 
      { blog },
      {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }
    )
    console.log(response.data)
    getBlogs(dispatch) 
  }
}

export default function(state = [], action){
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs
    case PUBLISH_BLOG:
      return [...state, action.blog]
    case UPDATE_BLOG:
      return state.find(blog => blog.id===action.blog.id)
    case UPDATE_RATING:
      console.log('redux thunks dipstach update rating ', action.blog)
      return state
    case DELETE_BLOG:
      return state.filter( blog => blog.id !== action.blog.id)
    default: 
      return state
  }
}