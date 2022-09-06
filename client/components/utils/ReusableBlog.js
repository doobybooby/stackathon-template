import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlogRating } from '../../store/blog'

export const ReusableBlog = (props) => {
  const {blog} = props
  const dispatch = useDispatch()

  const decrementRating = (blog)=> {
    dispatch(updateBlogRating(blog, -1))
  }

  const incrementRating = (blog)=> {
    dispatch(updateBlogRating(blog, 1))
  }
  
  return (
    <div>
      {
        <div > 
          <img width='5%' src={blog.user.profileImage} alt="" />
          <div className='flex-row'>
            <h3>{ blog.title }</h3>
            <button>DELETE</button>
          </div>
          <p>{ blog.description }</p>
          { blog.image && <img src={blog.image}></img>}
          <div className='flex-row'>
            <button onClick={()=>decrementRating(blog)}>-</button>
            <h4>{blog.rating}</h4>
            <button onClick={()=>incrementRating(blog)}>+</button>
            

          </div>
        </div>
      }
    </div>
  )
}
