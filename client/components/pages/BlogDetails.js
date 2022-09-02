import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blog, { getBlogs } from '../../store/blog'

export const BlogDetails = (props) => {
  const currentTime = new Date()
  const params = useParams()
  const blogs = useSelector( state => state.blogs )
  let blog = blogs.find(blog => blog.id === params.id*1)
  return (
    <div>
      <h1>DETAILS</h1>
      {
        blog 
          ? <div>
              <h3>Title: {blog.title}</h3>
              {blog.image && <img src={blog.image} alt="image" />}
              <p>{blog.description}</p>
              <p><button>Down</button> {blog.rating} <button>Up</button></p>
              <button>COMMENT</button>
              <button>share</button>
              <p>{ Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)/60) }H { Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)%60) }Min AGO</p>
          </div> 
          : null
      }
    </div>
  )
}
