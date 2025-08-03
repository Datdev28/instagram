import React from "react";
import { useParams, Outlet } from "react-router-dom";
import useConversations from "../../hooks/useConversation";
import useAuthStore from "../../store/authStore";
import Conversation from "./conversation/Conversation";
const InboxPage = () => {
  const { chatId } = useParams();
  const user = useAuthStore((state) => state.user);
  const { conversations } = useConversations(user?.uid);
  const isChatOpen = Boolean(chatId);
  return (
    <div className="flex h-screen text-white overflow-y-scroll custom-scrollbar">
      <div className="flex flex-2 flex-col px-4 gap-y-2 border-r border-r-color-dash pt-10 w-[380px]">
        <p className="font-bold">Tin nhắn</p>
        <div className="flex flex-col gap-y-4">
          {conversations &&
            conversations.length > 0 &&
            conversations.map((conversation) => (
              <Conversation conversation={conversation} currentUserId={user?.uid} chatId={chatId}/>
   
            ))}
        </div>
      </div>
      {!isChatOpen ? (
        <div className="flex flex-7 flex-col items-center justify-center">
          <div className="flex flex-col text-center justify-center items-center">
            <img
              src="/mess.jpg"
              className="w-26 h-26 rounded-full object-cover"
              alt="Tin nhắn"
            />
            <p className="text-lg">Tin nhắn của bạn</p>
            <p className="text-color-text-gray text-sm">
              Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-8">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default InboxPage;
