import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store'
import { getBlogs } from '../../store/blog'
import { BlogForm } from '../utils/BlogForm'
import { ReusableBlog } from '../utils/ReusableBlog'
import { AiTwotoneEdit } from 'react-icons/ai'


export const ProfilePage = () => {
  const user = useSelector(state => state.auth)
  const blogs = useSelector(state => state.blogs)
  let usersBlogs = blogs.filter( blog => blog.userId === user.id)
  const dispatch = useDispatch()
  
  useEffect(()=> {
    getBlogs(dispatch)
    usersBlogs = blogs.filter( blog => blog.userId === user.id)
  },[blogs.length, dispatch])

  return (
    <div className='flex-row user-profile-component'>
      <div className='user-profile-card ' >
        <div className='flex-row user-profile-card-header'> 
          <h2>{user.username.toUpperCase()}</h2>
          <a href="/profile/edit" ><AiTwotoneEdit size={'2em'}/></a>
        </div>
        <img src={user.profileImage} width='50%' />
        <p>Following : 0</p>
        <p>Contributed blogs: {usersBlogs.length}</p>
        <p>Received Upvotes : {usersBlogs.reduce((accum, blog)=>{ return accum += blog.rating}, 0)}</p>
      </div>
      <div className='profile-blog-section'>
        <ul className='profile-blogs-wrapper flex-col'>
          {
            usersBlogs &&
            usersBlogs.sort((a,b)=>  Date.parse(b.createdAt) - Date.parse(a.createdAt))
              .map( blog => <ReusableBlog  key={blog.id} blog={blog} /> )
          }
        </ul>
      </div>
    </div>
  )
}
