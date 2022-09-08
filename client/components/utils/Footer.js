import React from 'react'
import { SiGmail } from 'react-icons/si'

export const Footer = () => {
  return (
    <div className='flex-col flex-center footer-component'>
      <p>About</p>
      <p>© 2021 Nonya Toonz Records LLC</p>
      <div>
        <SiGmail /> nonaytoonz@gmail.com
      </div>
    </div>
  )
}
