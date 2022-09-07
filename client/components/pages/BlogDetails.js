import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlogRating, getBlogs } from '../../store/blog'
import { Comments } from '../utils/Comments'

export const BlogDetails = (props) => {
  const currentTime = new Date()
  const params = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === params.id*1)
  const [showComments, setShowComments] = useState(false)

  const decrementRating = (blog)=> {
    dispatch(updateBlogRating(blog, -1))
  }

  const incrementRating = (blog)=> {
    dispatch(updateBlogRating(blog, 1))
  }

  const displayComments = ()=> {
    setShowComments(prev => !prev)
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
              <button onClick={displayComments}>COMMENT</button>
              <button onClick={()=> alert(`localhost:8080${props.location.pathname}`)}>share</button>
              
            </div>
          </div>
      }
      {
        showComments 
          ? blog.replies.map(reply => <Comments key={reply.id} reply={reply}/> ) 
          : null 
      }
    </div>
  )
}