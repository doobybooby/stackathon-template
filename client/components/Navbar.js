import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { GoogleSearch } from './utils/GoogleSearch'
import { CSE } from './utils/CSE'
import {FaSearch} from 'react-icons/fa'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className='nav-component'>
    <nav>
      {
        isLoggedIn 
          ? (
            <div style={{display:'flex', justifyContent:'space-around', alignItems: 'center'}}>
              <h3>Nonya News</h3>
              <div className='flex-row'>
                <Link to="/home" className='flex-col'>NEWS</Link>
                {/* <Link to="/news">News</Link> */}
                <Link to="/blogs" className='flex-col'>BLOGS</Link>
                <div className="dropdown">
                  <p className='flex-col'>ACCOUNT</p>
                  <div className="dropdown-content">
                    <a href="/profile">Profile</a>
                    <a href="/profile/edit">Edit</a>
                    <a href="/" onClick={handleClick}>
                      Logout
                    </a>
                  </div>
                </div>
                <div className="dropdown">
                  <p><FaSearch size={'1.5rem'}/></p>
                  <div  className="dropdown-content">
                    <GoogleSearch style={{width:'100rem'}}/>
                  </div>
                </div>
              </div>
              {/* <h3>{displayTime()}</h3> */}
              {/* <CSE /> */}
            </div>
          ) 
          : (
            <div style={{display:'flex', justifyContent:'space-around'}}>
              <div className='flex-row'>
                <Link to="/home" className='flex-col'>News</Link>
                <Link to="/blogs" className='flex-col'>Blogs</Link>
                <Link to="/account" className='flex-col'>Log In</Link>
              </div>
              {/* <h3>{displayTime()}</h3> */}
              <GoogleSearch style={{width:'100rem'}}/>
            </div>
          )
      }
    </nav>
  </div>
)

let lastScroll = 0
window.addEventListener('scroll', ()=> {
  const currentScroll = window.pageYOffset

  if( currentScroll <= 0 ) {
    const nav = document.querySelector('.nav-component')
    nav.classList.remove('scroll-up')
  }
  if( currentScroll > lastScroll && !document.querySelector('.scroll-down')) {
    const nav = document.querySelector('.nav-component')
    nav.classList.remove('scroll-up')
    nav.classList.add('scroll-down')
  }
  if( currentScroll < lastScroll && document.querySelector('.scroll-down')) {
    const nav = document.querySelector('.nav-component')
    nav.classList.remove('scroll-down')
    nav.classList.add('scroll-up')
  }

  lastScroll = currentScroll
})

/**
 * CONTAINER
 */
const displayTime = () => {
  const currentTime = new Date()
  return `
    ${currentTime.toLocaleString('default', {month:'long'})} ${currentTime.getDate()},
    ${currentTime.getHours()}:${currentTime.getMinutes()}
    `
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
