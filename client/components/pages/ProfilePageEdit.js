import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../history'
import { editProfile } from '../../store'
import { CgArrowsExchangeV } from 'react-icons/cg'


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
    
    history.push('/profile')
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
      <form >
        <div className='flex-row'>
          <div className='flex-col'>
            <label htmlFor="">
              {
                userForm.profileImage === user.profileImage
                  ? <img src={user.profileImage} alt="" className='icon-40x' />
                  : <img src={userForm.profileImage} className='icon-40x'/>
              }
            </label>
            <label htmlFor="file-upload" className=''>
              <input id='file-upload' type='file' name='profileImage' onChange={inputImage} width='50%'></input>
              <CgArrowsExchangeV size={'2rem'}/>
            </label>
          </div>
          <div className='flex-col'>
            <input type='text' name='username' value={userForm.username} onChange={handleChange} placeholder={user.username}></input>
            <input type='password' name='password' value={userForm.password}  onChange={handleChange} placeholder='Password'></input>
          </div>
        </div>
        <button style={{width:'100%'}} onClick={sumbmitEditForm} disabled={allowSubmit()} >Submit</button>
      </form>
    </div>
  )
}
