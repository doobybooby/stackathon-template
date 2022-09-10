import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSearchResult } from '../../store/Cse'

export const CSE = () => {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput ] = useState('')
  
  const search = (ev) => {
    ev.preventDefault()
    dispatch(getSearchResult(searchInput))
  }
  

  return (
    <form>
      <div className="gcse-search">
      </div>

      <input type="text" placeholder='Search Anything' value={searchInput} onChange={(ev)=>setSearchInput(ev.target.value)}/>
      <button onClick={search}>Search</button>
    </form>
  )
}
