import { useParams } from "react-router-dom";
import { useState } from "react";
import useCreateChat from "../../../hooks/useCreateChat";
import useAuthStore from "../../../store/authStore";
import useGetProfileUserById from "../../../hooks/useGetProfileUserById";
import ChatDetail from "./ChatDetail";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
const Chat = () => {
  const { chatId } = useParams();
  const { user: currentUser } = useAuthStore();
  const { otherUserId, loading: loadingChat } = useCreateChat(
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
          <div className="flex-1 h-screen overflow-y-auto p-4 space-y-4">
            <div className="flex items-start flex-col">
              <div className="flex gap-x-2 items-center max-w-xs">
                <div className="flex items-end h-full">
                  <img
                    src={otherUserProfile?.profilePicURL}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                    alt="ảnh đại diện"
                  />
                </div>
                <div className="bg-color-dash p-3 rounded-r-2xl rounded-tl">
                  Hôm quaasd adsad sad sad sad sad sadsa đá sa
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex flex-col gap-x-2 items-center max-w-xs break-words bg-blue-500">
                <p>
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                  Hôm qua đi chơi Măng Đenasdsad asdsad sadsa dsad sad sad ád
                </p>
              </div>
            </div>
          </div>
           <ChatFooter isInfoOpen={isInfoOpen}/>
        </div>
        <ChatDetail
          otherUserProfile={otherUserProfile}
          isInfoOpen={isInfoOpen}
        />
      </div>
    </div>
  );
};

export default Chat;
