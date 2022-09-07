import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply, getReply } from '../../store/reply'

export const Comments = (props) => {
  const reply = props.reply
  const dispatch = useDispatch()
  const [shouldDisplayThread, setShouldDisplayThread] = useState(false)
  const replies = useSelector(state => state.reply)
  const commentThread = replies.filter(r => r.replyId === reply.id)

  const [inputThread, setInputThread] = useState('')



  const fetchThreads = (id) => {
    dispatch(getReply(id))
  }

  const displayThread = () => {
    setShouldDisplayThread(prev => !prev)
    fetchThreads(reply.id)
  }
  
  
  const handleInput = (ev)=> {
    setInputThread(ev.target.value)
  }
  
  const submitThread = (ev) => {
    ev.preventDefault()
    dispatch(addReply(inputThread, reply.id))
    setInputThread('')
  }

  return (
    <div>
      {reply.message}
      <button onClick={displayThread}>^</button>
      <ul>
        {
          shouldDisplayThread && 
          commentThread.map(thread => <li key={thread.id}>{thread.message}</li> )
        }
      </ul>      
      {
        shouldDisplayThread &&
        <form>
          <input type="text" value={inputThread} onChange={handleInput}/>
          <button onClick={submitThread}>Thread</button>
        </form>
      }
    </div>
  )
}
