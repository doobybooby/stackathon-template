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
              <div className='dropdown'>
                <Link to="/home">Home</Link>
                <div className="dropdown-content">
                  <a href="/blogs">Blogs</a>
                  <a href="/news">News</a>
                </div>
              </div>
              <h3>{displayTime()}</h3>
              <div className="dropdown">
                <Link to="/account">Account</Link>
                <div className="dropdown-content">
                  <a href="/" onClick={handleClick}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          ) 
          : (
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Link to="/">Home</Link>
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
