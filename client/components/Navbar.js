import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { GoogleSearch } from './utils/GoogleSearch'
import { FaSearch } from 'react-icons/fa'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className='nav-component'>
    <nav>
      {
        isLoggedIn 
          ? (
            <div style={{ display:'flex', justifyContent:'space-around', alignItems: 'center'}}>
              <div className='flex-col flex-center' style={{ flex:'1' }} >
                <h3 style={{ margin:'0', paddingTop:'0' }} >Nonya News</h3>
                {/* <h3 style={{ fontSize:'.7rem' }}>{ displayTime() }</h3> */}
              </div>
              <div className='flex-row flex-center' style={{ flex:'1' }}>
                <Link to="/home" className='flex-col'>NEWS</Link>
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
              </div>
              <div style={{ flex:'1' }}>
                <GoogleSearch style={{width:'100rem'}}/>
              </div>
            </div>
          ) 
          : (
            <div style={{ display:'flex', justifyContent:'space-around', alignItems:'center' }}>
              <div className='flex-row flex-center' style={{ flex:'1' }} >
                <h3 >Nonya News</h3>
              </div>
              <div className='flex-row flex-center' style={{ flex:'1'}}>
                <Link to="/home"> News </Link>
                <Link to="/blogs"> Blogs </Link>
                <Link to="/account"> Log In </Link>
              </div>
              <div style={{ flex:'1' }}>
                <GoogleSearch />
              </div>
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
