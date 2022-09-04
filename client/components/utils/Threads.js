import React from 'react'

export const Threads = (props) => {
  console.log(props)
  return (
    <div>
      {
        props.show &&
        props.comment.threads.map( thread => <li key={thread.id}>{thread.message}</li>)
      }
    </div>
  )
}
