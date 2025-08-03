import React, { useEffect, useState } from "react";
import useGetProfileUserById from "../../../hooks/useGetProfileUserById";
import { useNavigate, useParams } from "react-router-dom";
import { generateChatId } from "../../../utils/generateChatId";
import convertDateTimestampAgo from "../../../utils/convertDateTimestampAgo";
import { LuDot } from "react-icons/lu";
import markLastMessageAsRead from "../../../hooks/useMarkLastMessageAsRead";

const Conversation = ({ conversation, currentUserId }) => {
  const navigate = useNavigate();
  const { chatId: currentChatId } = useParams();

  const otherUserId = conversation.participants.find(
    (userId) => userId !== currentUserId
  );
  const isOwnLastMess = conversation?.lastMessage?.senderId === currentUserId;
  const { userProfile, isLoading } = useGetProfileUserById(otherUserId);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const thisChatId = generateChatId(currentUserId, otherUserId);
  const isActive = thisChatId === currentChatId;
  const isUnReaded =
    conversation?.lastMessage?.senderId !== currentUserId &&
    !conversation?.lastMessage?.isReaded;

  const handleClickChat = async () => {
    const isUnread =
      conversation?.lastMessage?.senderId !== currentUserId &&
      !conversation?.lastMessage?.isReaded;

    if (isUnread) {
      await markLastMessageAsRead(thisChatId);
    }

    navigate(`/direct/inbox/${thisChatId}`);
  };

  useEffect(() => {
    if (!isLoading && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [isLoading, hasLoadedOnce]);

  useEffect(() => {
    setHasLoadedOnce(false);
  }, [otherUserId]);

  if (isLoading && !hasLoadedOnce) {
    return (
      <div className="flex items-center gap-x-2 px-2 py-1 bg-gray-100 dark:bg-neutral-800 rounded-md animate-pulse">
        <div className="w-12 h-12 rounded-full bg-color-input-gray"></div>
        <div className="space-y-1">
          <p className="w-22 h-3 bg-color-input-gray rounded-sm"></p>
          <p className="w-16 h-3 bg-color-input-gray rounded-sm"></p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-x-2 cursor-pointer px-2 py-1 transition rounded-md 
        ${
          isActive
            ? "bg-color-dash"
            : "hover:bg-gray-100 dark:hover:bg-neutral-800"
        }`}
      onClick={handleClickChat}
    >
      <img
        src={userProfile?.profilePicURL || `/defaultProfilePic.jpg`}
        className="w-12 h-12 rounded-full object-cover shrink-0"
        alt="ảnh đại diện"
      />
      <div>
        <p className="truncate overflow-hidden whitespace-nowrap max-w-[120px] font-medium">
          {userProfile?.fullName}
        </p>
        <div className="flex items-center whitespace-nowrap">
          <p
            className={`${
              isUnReaded ? "text-white" : "text-color-text-gray"
            } text-xs truncate max-w-[140px]`}
          >
            {isOwnLastMess
              ? "Bạn: "
              : `${userProfile?.fullName?.split(" ")?.[0]}: `}
            {conversation?.lastMessage?.type === "text" &&
              conversation?.lastMessage?.content}
            {conversation?.lastMessage?.type === "image" && `đã gửi hình ảnh`}
            {conversation?.lastMessage?.type === "voice" &&
              "đã gửi đoạn hội thoại"}
            {conversation?.lastMessage?.type === "icon" && "đã gửi nhãn dán"}
          </p>
          <LuDot className="text-color-text-gray" />
          <p className="text-xs text-color-text-gray">
            {convertDateTimestampAgo(conversation?.lastMessage?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
