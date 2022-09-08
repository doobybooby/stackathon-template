import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import { GoogleSearch } from './components/utils/GoogleSearch'
import Routes from './Routes'
import { getBlogs } from './store/blog'

const App = () => {
  const blogs = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(()=>{
    getBlogs(dispatch)
  }, [])
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
