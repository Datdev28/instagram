import React from "react";
import { RiMessengerLine } from "react-icons/ri";
const MessChat = () => {
  return (
    <div>
      <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2">
        <RiMessengerLine className="text-3xl" />
        <p className={`max-lg:hidden`}>Tin nhắn</p>
      </div>
    </div>
  );
};

export default MessChat;
