import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../store/blog'
import { ReusableBlog } from '../utils/ReusableBlog'

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  console.log(typeof blogs, blogs)


  const currentTime = new Date()

  useEffect(()=> {
    getBlogs(dispatch)
  },[blogs.length])

  return (
    <div className='blog-component flex-col'>
      {
        blogs[0] ? 
          blogs.sort((a,b) => b.id - a.id).map( blog => 
            <ReusableBlog blog={blog} />
            
          ) :
          null
      }
    </div>
  )
}
