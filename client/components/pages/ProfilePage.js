import React, { useState } from 'react'
import { useEffect } from 'react'
import { Popup } from '../Popup'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../store/blog'
import { ReusableBlog } from '../utils/ReusableBlog'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { AiFillLike } from 'react-icons/ai'
import { FiPenTool } from 'react-icons/fi'

export const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector( state => state.auth )
  const blogs = useSelector( state => state.blogs )
  const [shouldPopUp, setShouldPopUp] = useState(false)
  let usersBlogs = blogs.filter( blog => blog.userId === user.id)
  
  useEffect(()=> {
    getBlogs(dispatch)
    usersBlogs = blogs.filter( blog => blog.userId === user.id)
  },[ blogs.length ])

  return (
    <div className='flex-row user-profile-component'>
      <div className='flex-col'>
        <div className='user-profile-card ' >
          <div className='flex-row user-profile-card-header'>
            <div className='flex-row flex-center'>
              <img src={user.profileImage} className='icon-40x' />
              <h2>{user.username.toUpperCase()}</h2>
            </div>
            <div className='flex-row flex-center' style={{justifyContent:'space-around'}} >
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
                : <p style={{textAlign:'center', background:'#F2F5FA', padding: '1rem'}}>NO BLOGS TO FETCH</p>
            }
          </div>
        </div>
      </div>
      
      <Popup trigger={shouldPopUp}  setTrigger={setShouldPopUp}>
      </Popup>
    </div>
  )
}
