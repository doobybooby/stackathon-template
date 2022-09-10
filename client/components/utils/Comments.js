import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply, getReply } from '../../store/reply'

export const Comments = (props) => {
  const reply = props.reply

  const dispatch = useDispatch()
  const replies = useSelector(state => state.reply)
  
  const [ inputThread, setInputThread ] = useState('')
  const [ shouldDisplayThread, setShouldDisplayThread ] = useState(false)
  const commentThread = replies.filter(r => r.replyId === reply.id)

  const setInput = props.setCommentInput
  const setId = props.setCommentId
  const setShouldSubmit = props.setShouldSubmitComment

  console.log('set input ', setInput, 'replies: ', replies)
  
  const fetchThreads = (id) => {
    dispatch(getReply(id))
  }

  const displayThread = () => {
    setShouldDisplayThread(prev => !prev)
    fetchThreads(reply.id)
  }
  
  
  const handleInput = (ev)=> {
    setInputThread(ev.target.value)
    setInput(ev.target.value)
  }
  
  const submitThread = (ev) => {
    ev.preventDefault()
    setShouldSubmit(true)
    setId(reply.Id)
    dispatch(addReply(inputThread, reply.id))
    setInputThread('')
    setInput('')
  }

  return (
    <div>
      <li>
        {reply.message}
        <button onClick={displayThread}>Show threads</button>
      </li>
      <ul>
        {
          shouldDisplayThread && 
          commentThread.map(reply => <Comments reply={reply} props={props} key={thread.id}/> )
        }
      </ul>      
      {
        shouldDisplayThread &&
        <Comments reply={thread} props={props}/>
        // <form>
        //   <input type="text" value={inputThread} onChange={handleInput}/>
        //   <button onClick={submitThread}>Thread</button>
        // </form>
      }
    </div>
  )
}
