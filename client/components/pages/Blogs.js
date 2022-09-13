import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../store/blog'
import { ReusableBlog } from '../utils/ReusableBlog'

export const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(()=> {
    getBlogs(dispatch)
  },[blogs.length])

  return (
    <div className='blog-component flex-col'>
      <div>
        {
          blogs[0] && 
            blogs.sort((a,b) => b.id - a.id).map( blog => 
              <ReusableBlog key={blog.id} blog={blog} />
            ) 
        }
      </div>
    </div>
  )
}
