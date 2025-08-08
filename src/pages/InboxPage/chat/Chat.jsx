import { useParams } from "react-router-dom";
import { useState } from "react";
import useCreateChat from "../../../hooks/useCreateChat";
import useAuthStore from "../../../store/authStore";
import useGetProfileUserById from "../../../hooks/useGetProfileUserById";
import ChatDetail from "./ChatDetail";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ListMessages from "./ListMessages";
const Chat = () => {
  const { chatId } = useParams();
  const { user: currentUser } = useAuthStore();
  const { otherUserId } = useCreateChat(
    chatId,
    currentUser?.uid
  );
  const { userProfile: otherUserProfile, isLoading: loadingProfile } =
    useGetProfileUserById(otherUserId);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
  };
  return (
    <div className="flex flex-col text-white w-full h-screen relative">
      <div className="flex w-full h-full">
        <div
          className={`flex flex-col h-full  ${
            isInfoOpen ? "w-full pr-77" : "w-full"
          } `}
        >
          <ChatHeader
            toggleInfo={toggleInfo}
            loadingProfile={loadingProfile}
            otherUserProfile={otherUserProfile}
            isInfoOpen={isInfoOpen}
          />
          <div className="flex-1 h-screen overflow-y-auto space-y-4 mb-20 pb-4">
             <ListMessages chatId={chatId} otherUserProfile={otherUserProfile}/>
          </div>
           <ChatFooter isInfoOpen={isInfoOpen}/>
        </div>
        <ChatDetail
          chatId={chatId}
          otherUserProfile={otherUserProfile}
          isInfoOpen={isInfoOpen}
        />
      </div>
    </div>
  );
};

export default Chat;
