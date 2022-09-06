import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store'
import { getBlogs } from '../../store/blog'
import { BlogForm } from '../utils/BlogForm'
import { ReusableBlog } from '../utils/ReusableBlog'

export const ProfilePage = () => {
  const user = useSelector(state => state.auth)
  const blogs = useSelector(state => state.blogs)
  let usersBlogs = blogs.filter( blog => blog.userId === user.id)
  const dispatch = useDispatch()
  
  useEffect(()=> {
    getBlogs(dispatch)
    usersBlogs = blogs.filter( blog => blog.userId === user.id)
  },[blogs.length])

  usersBlogs[0] ? console.log(Date.parse(usersBlogs[0].createdAt) ): null


  return (
    <div className='user-profile-component'>
      <div className='user-profile-card flex-row' >
        <div>
          <div className='flex-row'> 
            <h3>{user.username.toUpperCase()}</h3>
            <button>Edit</button>
          </div>
          <img src={user.profileImage} alt="" />
          <p>Contributed blogs: {usersBlogs.length}</p>
          <p>Received Upvotes : {usersBlogs.reduce((accum, blog)=>{ return accum += blog.rating}, 0)}</p>
        </div>
        <BlogForm />
      </div>
      <ul>
        <h2>Blogs</h2>
        {
          usersBlogs &&
          usersBlogs.sort((a,b)=>  Date.parse(b.createdAt) - Date.parse(a.createdAt))
            .map( blog => <ReusableBlog  key={blog.id} blog={blog} /> )
        }
      </ul>
    </div>
  )
}
