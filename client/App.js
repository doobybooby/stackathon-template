import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import { Spacer } from './components/Spacer'
import { Footer } from './components/utils/Footer'
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
      <Spacer />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
