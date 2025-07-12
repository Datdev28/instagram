import { useParams } from "react-router-dom";
import useCreateChat from "../../../hooks/useCreateChat";
import useAuthStore from "../../../store/authStore";

const Chat = () => {
  const { chatId } = useParams();
  const { user: currentUser } = useAuthStore(); 

  const { otherUserId, loading } = useCreateChat(chatId, currentUser?.uid);

  if (loading) return <p>Đang tải hộp thoại...</p>;

  return (
    <div className="chat-box">
      <p>Chat với user có ID: {otherUserId}</p>
      <input placeholder="Nhập tin nhắn..." />
    </div>
  );
};

export default Chat;
