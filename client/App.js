import React from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { getBlogs } from './store/blog'
const App = () => {
  const dispatch = useDispatch()
  getBlogs(dispatch)
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
