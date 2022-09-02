import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blog, { getBlogs } from '../../store/blog'
import { getThread } from '../../store/thread'
import { BlogForm } from '../utils/BlogForm'

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  // console.log(blogs, dispatch)


  const currentTime = new Date()

  useEffect(()=> {
    getBlogs(dispatch)
  },[blogs.length])

  return (
    <div>
      <BlogForm></BlogForm>
      {
        blogs[0] ? 
          blogs.sort((a,b) => b.id - a.id).map( blog => 
            <ul key={blog.id}  style={{backgroundColor:'black', color: 'white'}}>
              <button>
                <a href={`/blogs/${blog.id}`}>DETAIL</a>
              </button>
              <p>{blog.title}</p>
              {blog.image && <img src={blog.image} alt="image" />}
              <p>{blog.description}</p>
              <p><button>Down</button> {blog.rating} <button>Up</button></p>
              <button>COMMENT</button>
              <button>share</button>
              <p>{ Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)/60) }H { Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)%60) }Min AGO</p>
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
