import React, { useState } from 'react'

export const Comments = (props) => {
  return (
    <div>
      {
        props.blog.replies.map( reply => (
          <ul key={reply.id}>
            { reply.message }
            <button ></button>
          </ul>
        ))
      }
    </div>
  )
}
