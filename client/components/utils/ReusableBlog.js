import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlogRating } from '../../store/blog'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BiDownvote, BiUpvote, BiComment, BiShare } from 'react-icons/bi'
import { Comments } from '../utils/Comments'
import { useEffect } from 'react'
import { addComment, getComments } from '../../store/comments'

export const ReusableBlog = (props) => {
  const { blog } = props
  const currentTime = new Date()
  const [ commentInput, setCommentInput ] = useState('')
  const [ shouldDisplayComment, setShouldDisplayComment ] = useState(false)
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const blogComments = comments.filter(comment => comment.blogId === blog.id)

  const decrementRating = (blog)=> {
    dispatch(updateBlogRating(blog, -1))
  }
  const incrementRating = (blog)=> {
    dispatch(updateBlogRating(blog, 1))
  }
  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog))
  }
  const displayComment = ()=> {
    setShouldDisplayComment(prev => !prev)
    fetchComments(blog.id)
  }

  const handleInput = (ev) => {
    setCommentInput(ev.target.value)
  }

  const fetchComments = (id) => {
    dispatch(getComments(id))
  }

  const submitComment = (ev)=> {
    ev.preventDefault()
    console.log(commentInput)
    dispatch(addComment(commentInput, blog.id))
    setCommentInput('')
  }

  return (
    <div className='reusable-blog-card flex-col'>
      {
        <div > 
          <div className='flex-row reusable-blog-header'>
            <div className='flex-row '>
              <img width='15%' src={blog.user.profileImage} alt="" />
              <h3>{blog.user.username}</h3>
            </div>
            <AiTwotoneDelete size={'2rem'} onClick={()=> removeBlog(blog)} />
          </div>
          <h3>{ blog.title }</h3>
          <p>{ Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)/60) }H { Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)%60) }Min AGO</p>
          { blog.image && <img src={blog.image}></img>}
          <p>{ blog.description }</p>
          <div className='flex-row like-comment-share flex-center'>
            <div className='flex-row flex-center'>
              <BiDownvote onClick={()=>decrementRating(blog)} size={'2rem'}/>
              <h3>{blog.rating}</h3>
              <BiUpvote onClick={()=>incrementRating(blog)} size={'2rem'}/>
            </div>
            <div><BiComment size={'2rem'} onClick={displayComment}/></div>
            <div><BiShare size={'2rem'}/></div>
          </div>
          <form className='comment-form'>
            <input type="text" value={commentInput} onChange={handleInput}/>
            <button onClick={submitComment} >ADD</button>
          </form>
          {
            shouldDisplayComment &&
            blogComments.map(reply => <Comments key={reply.id} reply={reply}/>)
          }
        </div>
      }
    </div>
  )
}
