import React, { useState } from 'react'
import { BiDownvote, BiUpvote, BiComment, BiShare, BiEdit, BiUpload } from 'react-icons/bi'
import { AiTwotoneDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { modifyBlog } from '../../store/blog'

export const BlogEdit = (props) => {
  const user = useSelector(state => state.auth)
  const {blog} = props
  const {onClick} = props
  const [editBlogForm, setEditBlogForm] = useState({
    id: blog.id,
    title: blog.title,
    description: blog.description,
    userId: user.id
  })
  const dispatch = useDispatch()

  const handleChange = (ev) => {
    setEditBlogForm(prev=> ({...prev, [ev.target.name] : ev.target.value }))
  }

  const submitBlogEdit = (ev) => {
    ev.preventDefault()
    dispatch(modifyBlog(editBlogForm))
    onClick()
  }

  return (
    <div > 
      <form >
        <div className='flex-row reusable-blog-header'>
          <div className='flex-row '>
            <img width='15%' src={blog.user.profileImage} alt="" />
            <h3>{blog.user.username}</h3>
          </div>
          <div>
            <button onClick={submitBlogEdit}>
              <BiUpload size={'2rem'} />
            </button>
            <AiTwotoneDelete size={'2rem'} onClick={()=> removeBlog(blog)} />
          </div>
        </div>
        <div className='flex-col'>
          <input onChange={handleChange} name='title' type="text" placeholder={blog.title} value={editBlogForm.title}/>
          { blog.image && <img src={blog.image}></img>}
          <input onChange={handleChange} name='description' type="text" placeholder={blog.description} value={editBlogForm.description}/>
        </div>
      </form>
    </div>
  )
}
