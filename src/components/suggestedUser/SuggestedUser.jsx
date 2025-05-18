import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const SuggestedUser = ({user}) => {
  const [isFolow, setIsFolow] = useState(false);
  console.log(user);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Link to={user.userName}>
        <img
          src={user.profilePicURL}
          className="w-[2.8rem] h-[2.8rem] rounded-full object-cover cursor-pointer"
          alt="avatar"
        />
        </Link>
        <div className="flex flex-col justify-center">
        <Link to={user.userName}>
          <p className="cursor-pointer">{user.userName}</p>
        </Link>
          <p className="text-color-text-gray">Gợi ý cho bạn</p>
        </div>
      </div>
      <span className={`${isFolow ? "text-color-text-gray font-semibold" : "text-blue-500"} cursor-pointer text-xs hover:text-white`} onClick={() => {setIsFolow(!isFolow)}}>{isFolow ? "Đang theo dõi" : "Theo dõi"}</span>
    </div>
  );
};

export default SuggestedUser;
