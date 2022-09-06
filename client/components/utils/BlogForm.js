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

    const Data = new FormData()

    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      Data.append('file', reader.result)
      setUploadFile(reader.result);
      console.log('----dData-', Data)
    });
    reader.readAsDataURL(file);
    console.log('----dData-', Data)
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
