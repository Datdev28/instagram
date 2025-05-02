import React from "react";
import { useNavigate } from "react-router-dom";

const SuggestedHeader = () => {
  const navigate = useNavigate()
  const handleClickLogOut = () => {
    navigate("/auth")
  }
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-x-2">
        <img
          src="profile.jpg"
          className="w-[2.8rem] h-[2.8rem] rounded-full object-cover"
          alt="avatar"
        />
        <div className="flex flex-col justify-center">
          <p>quangdat.ng</p>
          <p className="text-color-text-gray">Quang Đạt</p>
        </div>
      </div>
      <span className="text-blue-400 text-xs cursor-pointer" onClick={handleClickLogOut}>Đăng xuất</span>
    </div>
  );
};

export default SuggestedHeader;
