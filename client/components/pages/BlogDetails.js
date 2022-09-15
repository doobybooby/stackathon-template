import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ReusableBlog } from '../utils/ReusableBlog'

export const BlogDetails = () => {
  const params = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === params.id*1)

  return (
    <div className='flex-col flex-center' style={{paddingTop:'5rem'}}>
      {
        blog && <ReusableBlog blog={blog} />
      }
    </div>
  )
}