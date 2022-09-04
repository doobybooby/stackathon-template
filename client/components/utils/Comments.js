import React, { useState } from 'react'
import { Threads } from './Threads'

export const Comments = (props) => {

  const [showThreads, setShowThreads] = useState(false)

  const displayThreads = ()=> {
    console.log('brah show me the threads')
    setShowThreads(prev => !prev)
  }
  return (
    <div>
      {
        props.blog.replies.map( reply => (
          <ul key={reply.id}>
            { reply.message }
            <button onClick={displayThreads}>Show Thread</button>
            {
              showThreads 
                ? <Threads comment={reply} show={showThreads}/>
                : null
            }
          </ul>
        ))
      }
    </div>
  )
}
