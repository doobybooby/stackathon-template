import React, { useState } from 'react'
import { Login, Signup } from '../AuthForm'

export const NavAccount = () => {

  const [loginStatus, setLoginStatus] = useState(true)

  const handleChange = (mode) => {
    if(mode === 'login')
      setLoginStatus(true)
    else setLoginStatus(false)
  }

  return (
    <div className={`account-page ${loginStatus ? 'login' : 'signup'} flex-col`}>
      {
        loginStatus ?
          <div>
            <h4>Welcome Back!</h4>
            <Login />
            <p>or</p>
            <button onClick={()=>handleChange('signup')}>Sign up</button>
          </div>
          :
          <div>
            <h4>Join Us!</h4>
            <Signup />
            <p>or</p>
            <button onClick={()=>handleChange('login')}>Login</button>
          </div>
      }
    </div>
  )
}
