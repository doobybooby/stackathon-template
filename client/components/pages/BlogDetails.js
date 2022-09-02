import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlogRating, getBlogs } from '../../store/blog'

export const BlogDetails = () => {
  const currentTime = new Date()
  const dispatch = useDispatch()
  const params = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === params.id*1)

  const decrementRating = (blog)=> {
    dispatch(updateBlogRating(blog, -1))
  }

  const incrementRating = (blog)=> {
    dispatch(updateBlogRating(blog, 1))
  }

  return (
    <div>
      Detail
      {
        blog &&
          <div>
            <h2>{blog.title}</h2>
            {blog.image && <img src={blog.image} alt="image" />}
            <h3>{blog.description}</h3>
            <p>{ Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)/60) }H { Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)%60) }Min AGO</p>
            <div style={{display:'flex'}}>
              <button onClick={()=>decrementRating(blog)}>Decrement</button>
              <h4>{blog.rating}</h4>
              <button onClick={()=>incrementRating(blog)}>Increment</button>
              <button>COMMENT</button>
              <button>share</button>
            </div>
          
          </div>
      }
    </div>
  )
}