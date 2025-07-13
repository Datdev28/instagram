import { useParams } from "react-router-dom";
import { useState } from "react";
import useCreateChat from "../../../hooks/useCreateChat";
import useAuthStore from "../../../store/authStore";
import useGetProfileUserById from "../../../hooks/useGetProfileUserById";
import { BsInfoCircle } from "react-icons/bs";
import { BsInfoCircleFill } from "react-icons/bs";

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
    <div className="flex flex-col text-white w-full h-screen">
      <div className="flex w-full">
        <div
          className={`flex flex-col  ${isInfoOpen ? "w-full pr-77" : "w-full"}`}
        >
          <div className="flex justify-between items-center border border-color-dash py-4 px-4 border-l-0 border-r-0">
            {loadingProfile ? (
              <div className="flex items-center gap-x-2">
                <div className="w-12 h-12 rounded-full bg-color-input-gray"></div>
                <div className="space-y-1">
                  <p className="w-22 h-3 bg-color-input-gray rounded-sm"></p>
                  <p className="w-16 h-3 bg-color-input-gray rounded-sm"></p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <img
                  src={otherUserProfile?.profilePicURL}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="ảnh đại diện"
                />
                <div className="space-y-1">
                  <p className="leading-none font-bold">
                    {otherUserProfile?.fullName}
                  </p>
                  <p className="text-color-text-gray leading-none text-xs">
                    {otherUserProfile?.userName}
                  </p>
                </div>
              </div>
            )}
            {isInfoOpen ? (
              <BsInfoCircleFill
                className="text-2xl cursor-pointer"
                onClick={toggleInfo}
              />
            ) : (
              <BsInfoCircle
                className="text-2xl cursor-pointer"
                onClick={toggleInfo}
              />
            )}
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-full w-80 border border-color-dash bg-black z-50  ${
            isInfoOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="font-semibold text-xl border border-color-dash py-[25.5px] px-4 border-l-0 border-r-0">
              Chi tiết
            </div>
            <div className=" py-4 flex flex-col justify-between flex-1">
              <div className="flex flex-col flex-1 border-b border-color-dash px-4">
                <p className="font-semibold">Thành viên</p>
                <div className="flex items-center gap-x-2 mt-4 h-16">
                  <img
                    src={otherUserProfile?.profilePicURL}
                    className="w-12 h-12 rounded-full object-cover"
                    alt="ảnh đại diện"
                  />
                  <div className="space-y-1">
                    <p className="leading-none font-bold">
                      {otherUserProfile?.fullName}
                    </p>
                    <p className="text-color-text-gray leading-none text-xs">
                      {otherUserProfile?.userName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4">
                <p className="cursor-pointer text-red-500">Xóa đoạn chat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
