import React from 'react'
import { useSelector } from 'react-redux'

export const ProfilePage = () => {
  const user = useSelector(state => state.auth)
  const blogs = useSelector(state => state.blogs)
  const usersBlogs = blogs.filter( blog => blog.userId === user.id)

  console.log(usersBlogs)
  return (
    <div className='user-profile-component'>
      <div className='user-profile-card'>
        <div className='flex-row'> 
          <h3>{user.username.toUpperCase()}</h3>
          <button>Edit</button>
        </div>
        <img src={user.profileImage} alt="" />
        <p>Blogs Written: {usersBlogs.length}</p>
        <p>Received Upvotes : {usersBlogs.reduce((accum, blog)=>{ return accum += blog.rating}, 0)}</p>
      </div>
      <ul>
        <h2>Blogs</h2>
        {
          usersBlogs.map( blog => <li key={blog.id}>
            <div className='flex-row'> 
              <img width='5%' src={blog.user.profileImage} alt="" />
              <h3>{ blog.title }</h3>
            </div>
            <p>{ blog.description }</p>
            { blog.image && <img src={blog.image}></img>}
            <p><button>-</button>{ blog.rating }<button>+</button></p>

          </li>)
        }
      </ul>
    </div>
  )
}
