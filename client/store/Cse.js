import axios from "axios"

const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT'

const setSearchResult = searchResults => ({type: SET_SEARCH_RESULT, searchResults})

export const getSearchResult = (query) => {
  console.log('create a thunks query', query)
  return async dispatch => {
    const response = await axios.get(`https://cse.google.com/cse?#gsc.tab=0&gsc.q=jcole&cx=11b3fccd251b44b4e`)
    console.log(response.data)
  }
}

export default function(state = [], action){
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return action.searchResults
  }
}