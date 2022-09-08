import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { AiFillHome } from 'react-icons/ai'
import { RiAccountCircleFill } from 'react-icons/ri'
import {ImNewspaper, ImBook, ImSearch} from 'react-icons/im'
import { GoogleSearch } from './utils/GoogleSearch'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className='nav-component'>
    <nav>
      {
        isLoggedIn 
          ? (
            <div style={{display:'flex', justifyContent:'space-around', alignItems: 'center'}}>
              <div className='flex-row'>
                <Link to="/home" className='flex-col'><ImNewspaper/>News</Link>
                {/* <Link to="/news">News</Link> */}
                <Link to="/blogs" className='flex-col'><ImBook />Blogs</Link>
                <div className="dropdown">
                  <p className='flex-col'><RiAccountCircleFill />Account</p>
                  <div className="dropdown-content">
                    <a href="/profile">Profile</a>
                    <a href="/profile/edit">Edit</a>
                    <a href="/profile/create_blog">Create Blog</a>
                    <a href="/" onClick={handleClick}>
                      Logout
                    </a>
                  </div>
                </div>
              </div>
              <h3>{displayTime()}</h3>
              <GoogleSearch />
            </div>
          ) 
          : (
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div className='flex-row'>
                <Link to="/home" className='flex-col'><ImNewspaper/>News</Link>
                <Link to="/blogs" className='flex-col'><ImBook />Blogs</Link>
                <Link to="/account" className='flex-col'><RiAccountCircleFill />Account</Link>
              </div>
              <h3>{displayTime()}</h3>
              <GoogleSearch />
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
