import React from "react";
import { RiMessengerLine } from "react-icons/ri";
import searchToggleStore from "../../store/searchToggleStore";
import { RiMessengerFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
const MessChat = () => {
  const {isOpenToggle} = searchToggleStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith("/direct/inbox");
  const handleClickMessChat = () => {
    navigate("/direct/inbox");
  }
  return (
      <div
      className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
      onClick={handleClickMessChat}
    >
      {isActive ? (
        <RiMessengerFill className="text-3xl" />
      ) : (
        <RiMessengerLine className="text-3xl" />
      )}
      {!isOpenToggle && <p className="max-lg:hidden">Tin nhắn</p>}
    </div>
  );
};

export default MessChat;

