import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postBlog } from '../../store/blog'

export const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadFile, setUploadFile] = useState();
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const inputName = (e)=> {
    setTitle(e.target.value)
  }
  const inputDescription = (e)=> {
    setDescription(e.target.value)
  }

  const handleClick = ()=> {
    setTitle(prev => '')
    setDescription(prev => '')
    props.setTrigger(false)
    dispatch(postBlog(title, description, uploadFile))
  }

  const inputImage = (ev) => {
    console.log('tryig to input an image')
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setUploadFile(reader.result);
    });
    reader.readAsDataURL(file);
  }


  return (
    <div className='blog-form-component'>
      <div className='blog-form'>
        {
          user &&
          <form onSubmit={handleClick} className='flex-col'>
            <div className='flex-row'>
              <img src={user.profileImage} className='icon-40x' alt="" />
              <input style={{width:'100%'}} type="text" onChange={inputName} placeholder='ENTER A CATCHY TITLE'/>
            </div>
            <label htmlFor="">Image:
              <input type="file" onChange={inputImage}/>
            </label>
            {
              uploadFile && <img className='icon-40x' src={uploadFile}/>
            }
            <textarea onChange={inputDescription} name="" id="" cols="25" rows="3" placeholder='enter description'></textarea>
            <button>Blog</button>
            {/* <button onClick={handleClick}>BLOG</button> */}
          </form >
        }
      </div>
    </div>
  )
}
