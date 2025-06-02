import React from 'react'
import { Link } from 'react-router-dom'
const NavbarLogout = () => {
  return (
    <div className='flex fixed top-0 w-full justify-center py-4 bg-black z-10 border border-b-color-dash'>
      <div className='max-w-4xl w-full flex items-center max-md:px-10 max-sm:px-2'>
        <div className='w-full'>
          <img src="/logo.png" className='w-[120px]' alt="logo" />
        </div>
        <div className='w-full flex justify-end items-center gap-x-4'>
          <Link to='/auth'>
           <button className='bg-blue-400 px-2 py-1 text-white font-semibold rounded-sm cursor-pointer whitespace-nowrap text-sm'>Đăng nhập</button>
           </Link>
           <p className='text-blue-500 cursor-pointer whitespace-nowrap text-sm'>Đăng ký</p>
        </div>
      </div>
    </div>
  )
}

export default NavbarLogout
