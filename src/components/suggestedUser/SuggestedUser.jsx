import React from "react";
import { useState } from "react";
const SuggestedUser = ({ name, avatar }) => {
  const [IsFolow, setIsFolow] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <img
          src={avatar}
          className="w-[2.8rem] h-[2.8rem] rounded-full object-cover cursor-pointer"
          alt="avatar"
        />
        <div className="flex flex-col justify-center">
          <p>{name}</p>
          <p className="text-color-text-gray">Gợi ý cho bạn</p>
        </div>
      </div>
      <span className={`${IsFolow ? "text-color-text-gray font-semibold" : "text-blue-500"} cursor-pointer text-xs hover:text-white`} onClick={() => {setIsFolow(!IsFolow)}}>{IsFolow ? "Đang theo dõi" : "Theo dõi"}</span>
    </div>
  );
};

export default SuggestedUser;
