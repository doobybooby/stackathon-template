import axios from "axios"

const SET_REPLY = 'SET_REPLY'

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

export default function(state = {}, action){
  switch (action.type) {
    case SET_REPLY:
      return action.reply
    default: 
      return state
  }
}