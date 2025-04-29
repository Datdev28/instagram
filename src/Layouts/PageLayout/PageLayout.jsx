import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar';

const PageLayout = ({children}) => {
  const {pathname} = useLocation();
  return (
    <div className='flex'>
      {pathname !== "/auth" ? (
       <div className='w-[70px] lg:w-[240px] min-h-screen  border border-r-color-dash bg-black pt-10 max-sm:hidden'>
        <Sidebar/>
       </div>
      ): null}
      <div className='flex-1 pb-10'>
        {children}
      </div>
    </div>
  )
}

export default PageLayout
