import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const ProfilePageEdit = () => {
  const user = useSelector(state => state.auth)

  console.log(user)
  return (
    <div className='edit-user-profile-component'>
      <h2>EDIT</h2>
      <form className='flex-col'>
        <label htmlFor="">
          <img src={user.profileImage} alt="" width='50%' />
        </label>
        <label htmlFor="">username</label>
        <input type='text'></input>
        <label htmlFor="">password</label>
        <input type='password'></input>
        <button>Submit</button>
      </form>
    </div>
  )
}
