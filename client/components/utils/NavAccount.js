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
      <div className='flex-row'>
        <button onClick={()=> handleChange('login')}><h3>Log-in</h3></button>
        <button onClick={()=> handleChange('signup')}><h3>Sign-up</h3></button>
      </div>

      {
        loginStatus && <Login />
      }
      
      {
        !loginStatus && <Signup />
      }
        
    </div>
  )
}
