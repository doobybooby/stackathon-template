import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlogRating, modifyBlog } from '../../store/blog'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BiDownvote, BiUpvote, BiComment, BiShare, BiEdit, BiDotsVerticalRounded } from 'react-icons/bi'
import { Comments } from '../utils/Comments'
import { addComment, getComments } from '../../store/comments'
import { BlogEdit } from '../pages/BlogEdit'
import { GrDocumentTime } from 'react-icons/gr'

export const ReusableBlog = (props) => {
  const { blog } = props
  const user = useSelector(state => state.auth)
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()
  const [ commentInput, setCommentInput ] = useState('')
  const [ shouldDisplayComment, setShouldDisplayComment ] = useState(false)
  const [allowEdit, setAllowEdit] = useState(false)
  const blogComments = comments.filter(comment => comment.blogId === blog.id)
  const currentTime = new Date()

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
    dispatch(addComment(commentInput, blog.id))
    setCommentInput('')
  }

  const toggleShowHide =()=> {
    setAllowEdit(prev => !prev)
  }

  const displayTimeDifference = (blogCreatedAt)=> {

    const timeDiff = ( currentTime.getTime() - new Date(blogCreatedAt) )/1000
    
    const seconds = Math.floor(timeDiff % 60)
    const secondsString = seconds < 10 ? `0${seconds}` : seconds
    
    const minutes = Math.floor( timeDiff / 60)%60
    const minsString = minutes < 10 ? `0${minutes}` : minutes
    
    const hours = Math.floor(Math.floor(( timeDiff / 60) ) /60)%24
    const hoursString = hours < 10 ? `0${hours}` : hours
    
    const days = Math.floor(Math.floor(Math.floor( timeDiff / 60) /60) /24 )
    const daysString = `${days}`
    const mins = Math.floor((Math.floor((Math.abs(currentTime - new Date(blog.createdAt)))/1000)/60)%60) 

    console.log('hours passed ----', hours)

    if(days > 0)
      return `${days} DAYS AGO`
    else if(hours > 0)
      return `${hours} HOURS AGO`
    else if(mins > 0)
      return `${minutes} MINS AGO`
    else return `${seconds} SECS AGO`
  }

  return (
    <div className='reusable-blog-card flex-col'>
      {
        !allowEdit ?
        <div > 
          <div className='flex-row reusable-blog-header'>
            <div className='flex-row flex-center'>
              {
                blog.user &&
                <>
                  <img className='icon-40x' src={blog.user.profileImage} alt="" />
                  <h3>{blog.user.username}</h3>
                </>
              }
            </div>
            <div className='flex-row flex-center'>
              <p>{ displayTimeDifference(blog.createdAt) }</p>
              <div>
                <div className="dropdown">
                  <BiDotsVerticalRounded />
                  {
                    blog.userId === user.id &&
                      <div className="dropdown-content">
                        <BiEdit onClick={()=> setAllowEdit(prev => !prev)} size={'2rem'} />
                        <AiTwotoneDelete size={'2rem'} onClick={()=> removeBlog(blog)} />
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <h3 style={{padding:'0 1rem', margin: '0'}}>{ blog.title }</h3>
          { blog.image && <img src={blog.image}></img>}
          <p style={{padding:'0 1rem', margin: '0'}}>{ blog.description }</p>
          <div className='flex-row like-comment-share flex-center'>
            <div className='flex-row flex-center'>
              <BiDownvote onClick={()=>decrementRating(blog)} size={'2rem'}/>
              <h3>{blog.rating}</h3>
              <BiUpvote onClick={()=>incrementRating(blog)} size={'2rem'}/>
            </div>
              <p>{blogComments.length}
              <BiComment size={'2rem'} onClick={displayComment}/>
              </p>
            <div><BiShare size={'2rem'}/></div>
          </div>
          <form className='comment-form'>
            <input type="text" value={commentInput} onChange={handleInput} placeholder='Add comment...'/>
            <button onClick={submitComment} >ADD</button>
          </form>
          {
            shouldDisplayComment &&
            blogComments.map(reply => <Comments key={reply.id} reply={reply}/>)
          }
        </div>
        : 
        <BlogEdit blog={blog} onClick={toggleShowHide}/>
      }
    </div>
  )
}
