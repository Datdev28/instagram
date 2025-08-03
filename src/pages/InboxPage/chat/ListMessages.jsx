import { useEffect, useRef, useState } from "react";
import useListenMessages from "../../../hooks/useListenMessages";
import useAuthStore from "../../../store/authStore";
import MessageBubble from "./MessageBubble";
import markLastMessageAsRead from "../../../hooks/useMarkLastMessageAsRead";
const ListMessages = ({ chatId, otherUserProfile }) => {
  const { user: currentUser } = useAuthStore();
  const { messages, loading, fetchMore, loadingMore, hasMore } =
    useListenMessages(chatId);
  const scrollRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const lastMsgIdRef = useRef(null);

  useEffect(() => {
    if (!loading && isInitialLoad && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsInitialLoad(false);

      if (messages.length > 0) {
        lastMsgIdRef.current = messages[messages.length - 1]?.id;
      }
    }
  }, [loading, messages.length]);

  useEffect(() => {
    if (!scrollRef.current || messages.length === 0) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.id !== lastMsgIdRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      lastMsgIdRef.current = lastMsg.id;
    }
  }, [messages]);
  useEffect(() => {
    if (!loading && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      const isFromOther = lastMsg.senderId !== currentUser?.uid;

      if (isFromOther && !lastMsg.isReaded) {
        markLastMessageAsRead(chatId);
      }
    }
  }, [chatId, loading, messages, currentUser?.uid]);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const threshold = 100;

    if (scrollTop <= threshold && hasMore && !loadingMore) {
      const prevHeight = scrollRef.current.scrollHeight;

      fetchMore().then(() => {
        const newHeight = scrollRef.current.scrollHeight;
        if (scrollRef.current) {
          scrollRef.current.scrollTop = newHeight - prevHeight;
        }
      });
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex flex-col gap-2 h-full overflow-y-auto pr-2 px-4 pb-4 pt-4"
    >
      {loadingMore && (
        <div className="w-full flex items-center justify-center">
          <img
            src="/loading.gif"
            className="object-cover w-10 h-10 rounded-full"
            alt="Đang tải"
          />
        </div>
      )}

      {messages.map((msg, index) => {
        const isOwn = msg.senderId === currentUser?.uid;
        const showAvatar =
          !isOwn &&
          (index === messages.length - 1 ||
            messages[index + 1]?.senderId !== msg.senderId);

        const prevMsg = messages[index - 1] || null;
        const isDifferentSender = msg.senderId !== prevMsg?.senderId;

        return (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${
              isDifferentSender ? "mt-10" : ""
            }`}
          >
            <MessageBubble
              msg={msg}
              isOwn={isOwn}
              showAvatar={showAvatar}
              otherUserProfile={otherUserProfile}
              prevMsg={prevMsg}
            />
          </div>
        );
      })}

      {loading && (
        <p className="text-center text-sm text-gray-500 mt-2">Đang tải...</p>
      )}
    </div>
  );
};

export default ListMessages;
