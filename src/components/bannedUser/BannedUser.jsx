import React from "react";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import useUnblockUser from "../../hooks/useUnblockUser";
import useAuthStore from "../../store/authStore";
import useBlockListStore from "../../store/blockListStore";

const BannedUser = ({ bannedUserId }) => {
  const { userProfile, isLoading } = useGetProfileUserById(bannedUserId);
  const user = useAuthStore(state => state.user);
  const removeBlockedId = useBlockListStore(state => state.removeBlockedId)
  const {handleUnblockUser} = useUnblockUser();
  const handleClickUnblock = async() => {
     await handleUnblockUser(user?.uid, userProfile?.uid);
     removeBlockedId(userProfile?.uid);
  }
  return (
    <div className="w-full flex items-center justify-between">
      {isLoading ? (
        <>
          <div className="animate-pulse w-full flex items-center gap-x-2">
            <div className="w-12 h-12 bg-color-note rounded-full"></div>
            <div className="flex flex-col justify-center gap-y-1">
              <div className="bg-color-note rounded w-40 h-5"></div>
              <div className="bg-color-note rounded w-30 h-5"></div>
            </div>
          </div>
          <button className="w-22 h-8 opacity-0 bg-color-note rounded-md font-semibold">
            xóa
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-x-2">
            <img
              src={userProfile?.profilePicURL || "defaultProfilePic.jpg"}
              className="w-11 h-11 rounded-full object-cover"
              alt="người bị chặn"
            />
            <div>
              <p>{userProfile?.userName}</p>
              <p className="text-color-text-gray">{userProfile?.fullName}</p>
            </div>
          </div>
          <button className="px-3 py-1 bg-color-btn-gray rounded-sm cursor-pointer"
           onClick={handleClickUnblock}
          >Bỏ chặn</button>
        </>
      )}
    </div>
  );
};

export default BannedUser;
