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
                  <Link to="/account" className='flex-col'><RiAccountCircleFill />Account</Link>
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
