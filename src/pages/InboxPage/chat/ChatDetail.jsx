import React from 'react'

const ChatDetail = ({isInfoOpen, otherUserProfile}) => {
  return (
        <div
          className={`fixed top-0 right-0 h-full w-80 border border-color-dash bg-black z-50  ${
            isInfoOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="font-semibold text-xl border border-color-dash py-[25.5px] px-4 border-l-0 border-r-0">
              Chi tiết
            </div>
            <div className=" py-4 flex flex-col justify-between flex-1">
              <div className="flex flex-col flex-1 border-b border-color-dash px-4">
                <p className="font-semibold">Thành viên</p>
                <div className="flex items-center gap-x-2 mt-4 h-16">
                  <img
                    src={otherUserProfile?.profilePicURL}
                    className="w-12 h-12 rounded-full object-cover"
                    alt="ảnh đại diện"
                  />
                  <div className="space-y-1">
                    <p className="leading-none font-bold">
                      {otherUserProfile?.fullName}
                    </p>
                    <p className="text-color-text-gray leading-none text-xs">
                      {otherUserProfile?.userName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4">
                <p className="cursor-pointer text-red-500">Xóa đoạn chat</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ChatDetail
