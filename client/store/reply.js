import axios from "axios"
import { getComments } from "./comments"

const SET_REPLY = 'SET_REPLY'
const ADD_REPLY = 'ADD_REPLY'
const EDIT_REPLY = 'EDIT_REPLY'

const setReply = reply => ({ type: SET_REPLY, reply })

export const getReply = (id) => {
  return async dispatch => {
    const response = await axios.get(`/api/replies/${id}`, { 
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })
    console.log('we are passing in this reply ', response.data, id)
    return dispatch(setReply(response.data))
  }
}

export const addReply = (message, id)=> {
  return async dispatch => {
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
    return dispatch(getReply(response.data.replyId))
  }
}


export const editComment = (message, id)=> {
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
    return dispatch({type: EDIT_REPLY, reply: response.data})
  
  }
}


export default function(state = [], action){
  switch (action.type) {
    case SET_REPLY:
      return [...state, ...action.reply].reduce((accum, reply)=>{
        if(!accum.find(set => set.id===reply.id))
        accum.push(reply)
        return accum
      },[])
    case EDIT_REPLY:
      console.log('redux thunks reply, ', [...state], action.reply)
      return [...state].map(reply => reply.id===action.reply.id ? action.reply : reply )
    default: 
      return state
  }
}