import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import { Footer } from './components/utils/Footer'
import Routes from './Routes'
import { getBlogs } from './store/blog'

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    getBlogs(dispatch)
  }, [])
  
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
