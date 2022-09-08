import React from 'react'
import { BlogForm } from './utils/BlogForm'

export const Popup = (props) => {
  return ( props.trigger) && (
    <div className="popup">
      <div className="popup-inner">
        <button className="close" onClick={()=> props.setTrigger(false)}> close</button>

          <BlogForm setTrigger={props.setTrigger} />
      </div>
    </div>
  )
}
