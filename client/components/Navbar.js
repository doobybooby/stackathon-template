import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className='nav-component'>
    <nav>
      {
        isLoggedIn 
          ? (
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <Link to="/home">Home</Link>
                <Link to="/blogs">Blogs </Link>
                <Link to="/news">News</Link>
              </div>
              <h3>{displayTime()}</h3>
              <div className="dropdown">
                <Link to="/account">Account</Link>
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
          ) 
          : (
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs </Link>
                <Link to="/news">News</Link>
              </div>
              <h3>{displayTime()}</h3>
              <Link to="/account">Account</Link>
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
