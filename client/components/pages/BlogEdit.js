import React, { useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import { AiTwotoneDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, modifyBlog } from '../../store/blog'

export const BlogEdit = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  
  const { blog } = props
  const { onClick } = props
  const [ editBlogForm, setEditBlogForm ] = useState({
    id: blog.id,
    title: blog.title,
    description: blog.description,
    userId: user.id
  })

  const handleChange = ev => {
    setEditBlogForm( prev => ({ ...prev, [ev.target.name] : ev.target.value }))
  }

  const submitBlogEdit = ev => {
    ev.preventDefault()
    dispatch( modifyBlog(editBlogForm) )
    onClick()
  }

  const removeBlog = ()=> {
    dispatch(deleteBlog(blog))
  }

  return (
    <div > 
      <form >
        <div className='flex-row reusable-blog-header'>
          <div className='flex-row flex-center'>
            <img className='icon-40x' src={blog.user.profileImage} alt="" />
            <h3>{blog.user.username}</h3>
          </div>
          <div>
            <BiUpload onClick={submitBlogEdit} size={'2rem'} />
            <AiTwotoneDelete size={'2rem'} onClick={()=> removeBlog(blog)} />
          </div>
        </div>
        <div className='flex-col'>
          <input onChange={handleChange} name='title' type="text" placeholder={blog.title} value={editBlogForm.title} className='p-1' />
          { blog.image && <img src={blog.image}></img> }
          <input onChange={handleChange} name='description' type="text" placeholder={blog.description} value={editBlogForm.description} className='p-1'/>
        </div>
      </form>
    </div>
  )
}
