import axios from "axios"

const SET_REPLY = 'SET_REPLY'
const ADD_REPLY = 'ADD_REPLY'

const setReply = reply => ({type: SET_REPLY, reply})

export const getReply = (id) => {
  return async dispatch => {
    const response = await axios.get(`/api/replies/${id}`, { 
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })
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

export default function(state = [], action){
  switch (action.type) {
    case SET_REPLY:
      return [...state, ...action.reply].reduce((accum, reply)=>{
        if(!accum.find(set => set.id===reply.id))
          accum.push(reply)
        return accum
      },[])
    default: 
      return state
  }
}