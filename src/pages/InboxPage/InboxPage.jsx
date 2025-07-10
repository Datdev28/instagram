import React from 'react'

const InboxPage = () => {
  return (
    <div className='flex h-screen text-white overflow-y-scroll custom-scrollbar'>
      <div className='flex flex-3 flex-col px-4 gap-y-6 border-r border-r-color-dash pt-10'>
        <p className='font-bold'>Tin nhắn</p>
        <div className='flex items-center gap-x-2'>
          <img src="/defaultProfilePic.jpg" className='w-12 h-12 rounded-full object-cover' alt="ảnh đại diện"/>
          <div>
            <p>Mr Beast</p>
            <p className='text-color-text-gray text-xs'>Bạn: a</p>
          </div>
        </div>
      </div>
      <div className='flex flex-7 flex-col items-center justify-center'>
        <div className='flex flex-col text-center justify-center items-center'>
           <img src="/mess.jpg" className='w-26 h-26 rounded-full object-cover' alt="Tin nhắn" />
           <p className='text-lg'>Tin nhắn của bạn</p>
           <p className='text-color-text-gray text-sm'>Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm</p>
        </div>
      </div>
    </div>
  )
}

export default InboxPage
