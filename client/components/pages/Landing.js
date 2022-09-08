import React from 'react'
import { useState } from 'react'
import { GoogleSearch } from '../utils/GoogleSearch'
import { Blogs } from './Blogs'
import { Root } from './Root'

export const Landing = () => {
  
  const [ display, setDisplay ] = useState('news')
  const [ isDisplay, setIsDisplay ] = useState(false)
  
  const changeDisplay = (mode) => {
    if(display !== mode){
      setDisplay(mode)
      setIsDisplay(true)
    }
  }

  return (
    <div className='flex-col' style={{justifyContent:'center', alignItems:'center'}}>
      <Root />
      {/* <div className='landing-component'>
        <GoogleSearch/>
        <div className='flex-row'>
          <button onClick={()=> changeDisplay('news')}>NEWS</button>
          <button onClick={()=> changeDisplay('blogs')}>BLOGS</button>
        </div>
      </div>
      {
        display === 'news' && <Root />
      }
      {
        display === 'blogs' && <Blogs />
      } */}
    </div>
  )
}
