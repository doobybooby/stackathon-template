import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store'
import { getBlogs } from '../../store/blog'
import { BlogForm } from '../utils/BlogForm'
import { ReusableBlog } from '../utils/ReusableBlog'
import { AiTwotoneEdit } from 'react-icons/ai'
import { FiPenTool } from 'react-icons/fi'
import { AiFillLike } from 'react-icons/ai'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Popup } from '../Popup'


import {BiMenu } from 'react-icons/bi'

export const ProfilePage = () => {
  const user = useSelector(state => state.auth)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const [shouldPopUp, setShouldPopUp] = useState(false)
  console.log('this is the sate of the blog', blogs)
  let usersBlogs = blogs.filter( blog => blog.userId === user.id)
  
  useEffect(()=> {
    getBlogs(dispatch)
    usersBlogs = blogs.filter( blog => blog.userId === user.id)
  },[blogs.length, dispatch])

  return (
    <div className='flex-row user-profile-component'>
      <div className='flex-col'>
        <div className='user-profile-card ' >
          <div className='flex-row user-profile-card-header'>
            <div className='flex-row'>
              <img src={user.profileImage} className='icon-40x' />
              <h2>{user.username.toUpperCase()}</h2>
            </div>
            <div className='flex-row' style={{justifyContent:'space-around'}} >
              <p style={{padding:'0 1rem'}} > <FiPenTool/> {usersBlogs.length}</p>
              <p style={{padding:'0 1rem'}} >
                <AiFillLike /> {usersBlogs.reduce((accum, blog)=>{ return accum += blog.rating}, 0)}
              </p>
              <BsFillPlusSquareFill size={'2rem'} onClick={ ()=> setShouldPopUp(prev => !prev) }  />
            </div>
          </div>
        </div>
        <div className='profile-blog-section'>
          <div className='profile-blogs-wrapper flex-col'>
            {
              usersBlogs.length > 0
                ? usersBlogs.sort((a,b)=>  Date.parse(b.createdAt) - Date.parse(a.createdAt))
                    .map( blog => <ReusableBlog  key={blog.id} blog={blog} /> )
                : <p style={{textAlign:'center', background:'#F2F5FA', padding: '1rem'}}>User doesn't have any blog</p>
            }
          </div>
        </div>
      </div>
      <Popup trigger={shouldPopUp}  setTrigger={setShouldPopUp}>
      
      </Popup>
    </div>
  )
}
