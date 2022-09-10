import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlogRating, modifyBlog } from '../../store/blog'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BiDownvote, BiUpvote, BiComment, BiShare, BiEdit, BiDotsVerticalRounded } from 'react-icons/bi'
import { Comment } from '../utils/Comment'
import { addComment, getComments } from '../../store/comments'
import { BlogEdit } from '../pages/BlogEdit'
import { displayTimeDifference } from './displayTimeDifference'

export const ReusableBlog = (props) => {
  
  const user = useSelector(state => state.auth)
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()
  
  const { blog } = props
  const blogComments = comments.filter(comment => comment.blogId === blog.id)
  
  const [ commentId, setCommentId ] = useState(blog.id)
  const [ commentInput, setCommentInput ] = useState('')
  const [ shouldSubmitComment, setShouldSubmitComment ] = useState(false)
  const [ shouldDisplayComment, setShouldDisplayComment ] = useState(false)
  const [ isThread, setIsThread ] = useState(false)
  const [ allowEdit, setAllowEdit ] = useState(false)
  const [ shouldFoucs, setShouldFocus ] = useState(false)

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
    fetchComments(commentId)
    setCommentId(blog.id)
    setIsThread(false)
  }

  const handleInput = (ev) => {
    setCommentInput(ev.target.value)
  }

  const fetchComments = (id) => {
    dispatch(getComments(id))
  }

  const focusOnInput = ()=> {
    if(shouldFoucs){
      const input = document.querySelector(`#replyInput-${blog.id}`)
      input.focus()
      console.log(input)
    }
  }
  focusOnInput()

  const submitComment = (ev)=> {
    ev.preventDefault()
    console.log(commentInput, commentId)
    dispatch(addComment(commentInput, commentId, isThread))
    setCommentInput('')
    setShouldFocus(false)
  }
  shouldSubmitComment && submitComment(commentInput, commentId)

  const toggleShowHide =()=> {
    setAllowEdit(prev => !prev)
  }

  useEffect(()=>{
    fetchComments(blog.id)
  }, [])


  return (
    <div className='reusable-blog-card flex-col'>
      {
        !allowEdit 
        ? <div > 
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
            <input id={`replyInput-${blog.id}`} type="text" value={commentInput} onChange={handleInput} placeholder='Add comment...'/>
            <button onClick={submitComment} >ADD</button>
          </form>
          <ul>
          {
            shouldDisplayComment &&
            blogComments.map(reply => <li key={reply.id} ><Comment reply={reply} setCommentId={setCommentId} setShouldFocus={setShouldFocus} setIsThread={setIsThread}/></li>)
          }
          </ul>
        </div>
        : <BlogEdit blog={blog} onClick={toggleShowHide}/>
      }
    </div>
  )
}
