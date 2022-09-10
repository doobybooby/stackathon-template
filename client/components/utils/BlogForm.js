import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postBlog } from '../../store/blog'
import {MdAddPhotoAlternate} from 'react-icons/md'


export const BlogForm = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadFile, setUploadFile] = useState();
  const articleUrl = props.articleUrl

  const inputName = (e)=> {
    setTitle(e.target.value)
  }
  const inputDescription = (e)=> {
    setDescription(e.target.value)
  }

  const handleClick = ()=> {
    setTitle('')
    setDescription('')
    props.setTrigger(false)
    dispatch(postBlog(title, description, uploadFile, articleUrl))
  }

  const inputImage = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setUploadFile(reader.result);
    });
    reader.readAsDataURL(file);
  }

  const focusFile = ()=> {
    const inputFile = document.querySelector('#file-upload')
    inputFile.focus()
  }

  return (
    <div className='blog-form-component'>
      <div className='blog-form flex-col flex-center'>
        {
          user &&
          <form onSubmit={handleClick} className='flex-col' style={{color:'#85D4FC'}}>
            <div className='flex-row'>
              <img src={user.profileImage} className='icon-40x' alt="" />
              <input style={{width:'100%'}} type="text" onChange={inputName} placeholder='ENTER A CATCHY TITLE'/>
            </div>
            {
              uploadFile && <img width='300px' style={{alignSelf:'center'}} src={uploadFile}/>
            }
            {
              articleUrl && <p>{articleUrl}</p>
            }
            <textarea onChange={inputDescription} name="" id="" cols="25" rows="5" placeholder='enter description'></textarea>
            <label htmlFor="file-upload" className='flex-row flex-center' style={{ border:' 1px dotted white' }}>
              <input id='file-upload' type="file" onChange={inputImage}/>
              Add A Photo<MdAddPhotoAlternate size={'2rem'}/>
            </label>
            <button className='blog-form-submit-button' style={{ border:'1px solid black' }}>Blog</button>
            {/* <button onClick={handleClick}>BLOG</button> */}
          </form >
        }
      </div>
    </div>
  )
}
