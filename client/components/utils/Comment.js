import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply, getReply } from '../../store/reply'

export const Comment = (props) => {
  const setCommentId = props.setCommentId
  const setShouldFoucs = props.setShouldFocus
  const setIsThread = props.setIsThread
  
  const dispatch = useDispatch()
  const reply = props.reply
  const replies = useSelector(state => state.reply)
  const commentThread = replies.filter(r => r.replyId === reply.id)

  const [ shoudDisplayThread, setShouldDisplayThread ] = useState(false)
  console.log(replies)
  
  const displayThreads = () => {
    setShouldDisplayThread(prev => !prev)
    fetchThreads(reply.id)
    console.log('display threads')
  }

  const fetchThreads = (id) => {
    dispatch(getReply(id))
  }

  const queryResponse = ()=> {
    setCommentId(reply.id)
    setShouldFoucs(true)
    setIsThread(true)
  }

  return (
    <div>
      <p>{ reply.message }</p>
      <button onClick={displayThreads}>Show Threads</button>
      <button onClick={queryResponse}>Reply</button>
      <ul>
        {
          shoudDisplayThread &&
          commentThread.map( reply => <li  key={reply.id}> <Comment reply={reply} setCommentId={setCommentId} setShouldFocus={setShouldFoucs} setIsThread={setIsThread} /></li> )
        }
      </ul>
    </div>
  )
}
