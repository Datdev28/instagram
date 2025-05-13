import React from 'react'
import Home from './Home'
import Search from './Search'
import Notifications from './Notifications'
import Create from './Create'
import Profile from './Profile'
import MessChat from './MessChat'
const SidebarItems = () => {
  return (
    <div className="flex flex-col gap-y-5 max-lg:items-center">
      <Home/>
      <Search/>
      <MessChat/>
      <Notifications/>
      <Create/>
      <Profile/>
    </div>
  )
}

export default SidebarItems
