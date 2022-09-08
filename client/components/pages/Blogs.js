import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../store/blog'
import { ReusableBlog } from '../utils/ReusableBlog'
import { BlogForm } from '../utils/BlogForm'

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(()=> {
    getBlogs(dispatch)
  },[blogs.length])

  return (
    <div className='blog-component flex-col'>
      <BlogForm />
      {
        blogs[0] ? 
          blogs.sort((a,b) => b.id - a.id).map( blog => 
            <ReusableBlog key={blog.id} blog={blog} />
            
          ) :
          null
      }
    </div>
  )
}
