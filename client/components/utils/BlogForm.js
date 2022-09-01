import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { postBlog } from '../../store/blog'

export const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const inputName = (e)=> {
    setTitle(e.target.value)
  }
  const inputDescription = (e)=> {
    setDescription(e.target.value)
  }

  const handleClick = ()=> {
    dispatch(postBlog(title, description))
  }

  return (
    <div>BlogForm
      <form action="">
        <label htmlFor="">Title:</label>
        <input type="text" onChange={inputName}/>
        <label htmlFor="">Description:</label>
        <input type="text" onChange={inputDescription}/>
      </form>
      <button onClick={handleClick}>BLOG</button>
    </div>
  )
}
