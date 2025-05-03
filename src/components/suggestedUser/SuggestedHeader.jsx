import React from "react";
import useLogOut from "../../hooks/useLogOut";
const SuggestedHeader = () => {
  const {handleLogOut, isLoginOut} = useLogOut()
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
      <button className="text-blue-400 text-xs cursor-pointer" onClick={handleLogOut}>Đăng xuất</button>
    </div>
  );
};

export default SuggestedHeader;
