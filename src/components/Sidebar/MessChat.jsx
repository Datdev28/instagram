import React from "react";
import { RiMessengerLine } from "react-icons/ri";
import searchToggleStore from "../../store/searchToggleStore";
const MessChat = () => {
  const { isOpenToggle } = searchToggleStore();
  return (
    <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2">
      <RiMessengerLine className="text-3xl" />
      {!isOpenToggle && <p className={`max-lg:hidden`}>Tin nhắn</p>}
    </div>
  );
};

export default MessChat;
