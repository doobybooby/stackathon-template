import React from 'react'
import { BlogForm } from './utils/BlogForm'
import { AiFillCloseCircle } from 'react-icons/ai'


export const Popup = (props) => {
  const articleUrl = props.articleUrl
  return ( props.trigger) && (
    <div className="popup">
      <div className="popup-inner">
        <div className='flex-row'>
          <AiFillCloseCircle size={'2rem'} className="close" onClick={()=> props.setTrigger(false)}/>
        </div>
          <h3 className='m-0 ' style={{textAlign:'center'}}>Create Blog</h3>
        <BlogForm setTrigger={props.setTrigger} articleUrl={articleUrl} />
      </div>
    </div>
  )
}
