import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postBlog } from '../../store/blog'
import {MdAddPhotoAlternate} from 'react-icons/md'


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
      <div className='blog-form flex-col flex-center'>
        {
          user &&
          <form onSubmit={handleClick} className='flex-col'>
            <div className='flex-row'>
              <img src={user.profileImage} className='icon-40x' alt="" />
              <input style={{width:'100%'}} type="text" onChange={inputName} placeholder='ENTER A CATCHY TITLE'/>
            </div>
            {
              uploadFile && <img width='100%' src={uploadFile}/>
            }
            <textarea onChange={inputDescription} name="" id="" cols="25" rows="5" placeholder='enter description'></textarea>
            <label htmlFor="file-upload" className='flex-row flex-center'>
              <input id='file-upload' type="file" onChange={inputImage}/>
              Add A Cover Photo<MdAddPhotoAlternate size={'2rem'}/>
            </label>
            <button className='blog-form-submit-button'>Blog</button>
            {/* <button onClick={handleClick}>BLOG</button> */}
          </form >
        }
      </div>
    </div>
  )
}
