import React from 'react'
import { useSelector } from 'react-redux'

export const ProfilePage = () => {
  const user = useSelector(state => state.auth)
  const blogs = useSelector(state => state.blogs)
  const usersBlogs = blogs.filter( blog => blog.userId === user.id)

  console.log(blogs, user)
  return (
    <div className='user-profile-component flex-row'>
      <div className='user-profile-card'>
        <div className='flex-row'> 
          <h3>{user.username.toUpperCase()}</h3>
          <button>Edit</button>
        </div>
        <img src={user.profileImage} alt="" />
      </div>
      <div>
        {
          usersBlogs.map( blog => <p>{blog.title}</p>)
        }
      </div>
    </div>
  )
}
