import axios from "axios"

const SET_BLOGS = 'SET_BLOGS'

const setBlogs = blogs => ({type: SET_BLOGS, blogs})

export const getBlogs = async dispatch => {
  const response = await axios.get('/api/blogs')
  return dispatch(setBlogs(response.data))
}

export default function(state = {}, action){
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs
    default: 
      return state
  }
}