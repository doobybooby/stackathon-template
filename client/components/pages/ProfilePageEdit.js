import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../history'
import { editProfile } from '../../store'

export const ProfilePageEdit = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const [userForm, setUserForm ] = useState({
    username: user.username,
    password: '',
    profileImage: user.profileImage
  })

  const handleChange = (ev) => {
    setUserForm(prev=> ({...prev, [ev.target.name] : ev.target.value }))
  }
  
  const inputImage = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setUserForm(prev => ({...prev, profileImage: reader.result}));
    });
    reader.readAsDataURL(file);
  }

  const sumbmitEditForm = (ev) => {
    ev.preventDefault()
    dispatch(editProfile(userForm))
  }

  const allowSubmit =()=> {
    if( userForm.username === user.username 
        && userForm.password === '' 
        && userForm.profileImage === user.profileImage)
      return true
    else return false
  }

  return (
    <div className='edit-user-profile-component'>
      <h2>EDIT</h2>
      <form className='flex-col'>
        <label htmlFor="">
          {
            userForm.profileImage === user.profileImage
              ? <img src={user.profileImage} alt="" width='50%' />
              : <img src={userForm.profileImage} />
          }
        </label>
        <label htmlFor="">username</label>
        <input type='text' name='username' value={userForm.username} onChange={handleChange} placeholder={user.username}></input>
        <label htmlFor="" >password</label>
        <input type='password' name='password' value={userForm.password}  onChange={handleChange}></input>
        <label htmlFor="" >image</label>
        <input type='file' name='profileImage' onChange={inputImage}></input>
        <button onClick={sumbmitEditForm} disabled={allowSubmit()} >Submit</button>
      </form>
    </div>
  )
}
