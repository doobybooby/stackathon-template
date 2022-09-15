import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply, getReply } from '../../store/reply'
import { BiReply } from 'react-icons/bi'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'

export const Comment = props => {
  const setCommentId = props.setCommentId
  const setShouldFoucs = props.setShouldFocus
  const setIsThread = props.setIsThread
  const setIsEditReply = props.setIsEditReply
  const reply = props.reply
  
  const user = reply.user
  
  const dispatch = useDispatch()
  const replies = useSelector(state => state.reply)
  const commentThread = replies.length > 0 ? replies.filter(r => r.replyId === reply.id) : []

  const [ shoudDisplayThread, setShouldDisplayThread ] = useState(commentThread.length > 0)
  
  const displayThreads = () => {
    setShouldDisplayThread(prev => !prev)
    fetchThreads(reply.id)
  }

  const fetchThreads = (id) => {
    dispatch(getReply(id))
  }

  const queryResponse = ()=> {
    setCommentId(reply.id)
    setShouldFoucs(true)
    setIsThread(true)
  }
  
  const editComment = () => {
    console.log('edit comment' ,reply)
    setCommentId(reply.id)
    setShouldFoucs(true)
    setIsEditReply(true)
  }

  return (
    <div style={{width:'100%'}}>
      <div className='flex-row' style={{ alignItems:'center', width:'100%' }}>
        {
          user &&
            <img className='icon-40x' src={ user.profileImage } alt="" />
          
        }
        <div className='flex-col'>
          <div className='flex-row m-0 p-0'>
            <p className='p-0 m-0'>{ reply.message }</p>
            <p style={{ padding:'0 .5rem', margin:0, color:'blue' }} onClick={queryResponse}><BiReply style={{padding:0, margin:0}} />Reply</p>
          </div>
          <p className='p-0 m-0' onClick={displayThreads} ><AiOutlineCaretDown/> Threads</p>
        </div>
        <div style={{ justifySelf:'flex-end' }}>
          <MdEdit size={'2rem'} onClick={editComment}/>
        </div>
      </div>

      <div style={{ padding:'1rem' }}>
        {
          shoudDisplayThread &&
          commentThread.map( reply =>  <Comment key={reply.id} reply={reply} setCommentId={setCommentId} setShouldFocus={setShouldFoucs} setIsThread={setIsThread} setIsEditReply={setIsEditReply} /> )
        }
      </div>
    </div>
  )
}
