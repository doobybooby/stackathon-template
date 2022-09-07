import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { postBlog } from '../../store/blog'

export const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadFile, setUploadFile] = useState();

  const dispatch = useDispatch()

  const inputName = (e)=> {
    setTitle(e.target.value)
  }
  const inputDescription = (e)=> {
    setDescription(e.target.value)
  }

  const handleClick = ()=> {
    dispatch(postBlog(title, description, uploadFile))
  }

  const inputImage = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setUploadFile(reader.result);
    });
    reader.readAsDataURL(file);
  }


  return (
    <div>
      <form >
        <label htmlFor="">Title:
          <input type="text" onChange={inputName}/>
        </label>
        <label htmlFor="">Description:
          <input type="text" onChange={inputDescription}/>
        </label>
        <label htmlFor="">Image:
          <input type="file" onChange={inputImage}/>
        </label>
        <button onClick={handleClick}>BLOG</button>
      </form>
    </div>
  )
}
