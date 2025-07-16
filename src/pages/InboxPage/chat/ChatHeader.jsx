import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { BsInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const ChatHeader = ({
  toggleInfo,
  loadingProfile,
  otherUserProfile,
  isInfoOpen,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center border border-color-dash py-4 px-4 border-l-0 border-r-0">
      {loadingProfile ? (
        <div className="flex items-center gap-x-2">
          <div className="w-12 h-12 rounded-full bg-color-input-gray"></div>
          <div className="space-y-1">
            <p className="w-22 h-3 bg-color-input-gray rounded-sm"></p>
            <p className="w-16 h-3 bg-color-input-gray rounded-sm"></p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => navigate(`/${otherUserProfile.userName}`)}
        >
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
      )}
      {isInfoOpen ? (
        <BsInfoCircleFill
          className="text-2xl cursor-pointer"
          onClick={toggleInfo}
        />
      ) : (
        <BsInfoCircle
          className="text-2xl cursor-pointer"
          onClick={toggleInfo}
        />
      )}
    </div>
  );
};

export default ChatHeader;
