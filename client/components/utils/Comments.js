import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reply, { getReply } from '../../store/reply'

export const Comments = (props) => {
  const comment = props.reply
  const [threads, setThreads] = useState(false)
  const replies = useSelector(state => state.reply)
  const dispatch = useDispatch()


  const displayThreads = () => {
    if( replies ) {
      const replyArray = Array.from(replies)
      replyArray.map( reply => console.log(reply.refId, comment.id))
      // console.log('---', comment.id)
      return replyArray.map( reply => {
        // if(reply.refId === comment.id) 
          return <ul key={reply.id}>
            <li>
              <Comments reply={reply} />
            </li>
          </ul> })
    }
    else return null
  }


  console.log(replies)
  return (
    <div>
      <p>{comment.message}</p>
      <button onClick={()=> {
          setThreads(prev => !prev)
          dispatch(getReply(comment.id))
        }}>Threads</button>
      {
        threads &&displayThreads()
      }
    </div>
  )
}
