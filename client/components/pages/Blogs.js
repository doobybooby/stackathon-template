import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../store/blog'

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  console.log(blogs)
  return (
    <div>
      <button onClick={()=> getBlogs(dispatch)}>BLOGS</button>
      {
        blogs[0] ? 
          blogs.map(blog => 
            <ol key={blog.id}>
                {blog.title}
              <ul>
                  {blog.replies.map( reply => <li key={reply.id}>{reply.message}</li>)}
              </ul>
            </ol>
            
          ) :
          null
      }
    </div>
  )
}
