import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blog, { getBlogs } from '../../store/blog'
import { getThread } from '../../store/thread'
import { BlogForm } from '../utils/BlogForm'

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  // console.log(blogs, dispatch)

  useEffect(()=> {
    getBlogs(dispatch)
  },[blogs.length])

  return (
    <div>
      <BlogForm></BlogForm>
      <button onClick={()=> getBlogs(dispatch)}>BLOGS</button>
      {
        blogs[0] ? 
          blogs.sort((a,b) => b.id - a.id).map( blog => 
            <ul key={blog.id}  style={{backgroundColor:'black', color: 'white'}}>
              <p>{blog.title}</p>
              {blog.image && <img src={blog.image} alt="image" />}
              <p>{blog.description}</p>
              <p><button>Down</button> {blog.rating} <button>Up</button></p>
              <ul>
                  { blog.replies.map( reply => 
                    <li key={reply.id}>
                      {reply.message}
                      {reply.threads.map( thread => <ul key={thread.id}>{thread.message}</ul> )}
                    </li>
                  )}
              </ul>
            </ul>
            
          ) :
          null
      }
    </div>
  )
}
