import axios from "axios"
import { getReply } from "./reply"

const SET_COMMENT = 'SET_COMMENT'

const setComments = comments => ({type: SET_COMMENT, comments})

export const getComments = (id) => {
  return async dispatch => {
    const response = await axios.get(`/api/blogs/${id}/comments`, { 
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })
    return dispatch(setComments(response.data))
  }
}

export const addComment = (message, id, isThread)=> {
  return async dispatch => {
    if(isThread){
      const response = await axios.post('/api/replies',
        {
          message,
          replyId:id
        },
        {
          headers: {
            authorization: window.localStorage.getItem('token')
          }
        }
      )
      // return dispatch(getComments(response.data.blogId))
      return dispatch(getReply(response.data.replyId))
    }
    else {
      const response = await axios.post('/api/replies',
        {
          message,
          blogId:id
        },
        {
          headers: {
            authorization: window.localStorage.getItem('token')
          }
        }
      )
      return dispatch(getComments(response.data.blogId))
    }
  }
}

export const editCommentReply = (message, id)=> {
  return async dispatch => {
    const response = await axios.put(`/api/replies`,
      {
        message,
        id
      },
      {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }
    )
    console.log('now re render the comment ', response.data)
    // dispatch(getReply(response.data.id))
    return dispatch(getComments(response.data.id))
  
  }
}


export default function(state = [], action){
  switch (action.type) {
    case SET_COMMENT:
      return [...state, ...action.comments].reduce((accum, comment)=>{
        if(!accum.find(set => set.id===comment.id))
          accum.push(comment)
        return accum
      },[])
    default: 
      return state
  }
}