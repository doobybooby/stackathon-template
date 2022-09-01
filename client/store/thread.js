import axios from "axios"

const SET_THREAD = 'SET_THREAD'

const setThread = threads => ({type: SET_THREAD, threads})

export const getThread = async dispatch => {
  const response = await axios.get('/api/threads')
  return dispatch(setThread(response.data))
}

export default function(state = {}, action){
  switch (action.type) {
    case SET_THREAD:
      return action.threads
    default: 
      return state
  }
}