import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import useDeleteUserFollowers from "../../hooks/useDeleteUserFollowers";
import { useState } from "react";
import ModalConfirmDeleteUserFollower from "../modal/ModalConfirmDeleteUserFollower";
const UserFollow = ({ userFollowId }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { handleDelelteFollower } = useDeleteUserFollowers();
  const { userProfile, isLoading } = useGetProfileUserById(userFollowId);
  const [
    isOpenModalConfirmDeleteUserFollower,
    setIsOpenModalConfirmDeleteUserFollower,
  ] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  return (
    <div className="flex justify-between items-center">
      {isLoading ? (
        <>
          <div className="animate-pulse w-full flex items-center gap-x-2">
              <div className="w-12 h-12 bg-color-note rounded-full"></div>
              <div className="flex flex-col justify-center gap-y-1">
                <div className="bg-color-note rounded w-40 h-5"></div>
                <div className="bg-color-note rounded w-30 h-5"></div>
              </div>
          </div>
          <button className="w-18 h-8 invisible bg-color-note rounded-md font-semibold">
            Gỡ
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-x-2 w-full">
            <img
              src={userProfile?.profilePicURL || "/defaultProfilePic.jpg"}
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              alt="avatar"
              onClick={() => navigate(`/${userProfile?.userName}`)}
            />
            <div className="flex flex-col justify-center gap-y-1">
              <p
                className="cursor-pointer w-40 h-5"
                onClick={() => navigate(`/${userProfile?.userName}`)}
              >
                {userProfile?.userName}
              </p>
              <p className="text-color-text-gray w-30 h-5">{userProfile?.fullName}</p>
            </div>
          </div>
          {isDeleted ? (
            <button
              className={`w-18 h-8 px-2 bg-color-note font-semibold rounded-md `}
            >
              Đã gỡ
            </button>
          ) : (
            <button
              className={` w-18 h-8 px-2 bg-color-note font-semibold rounded-md cursor-pointer`}
              onClick={() => setIsOpenModalConfirmDeleteUserFollower(true)}
            >
              Gỡ
            </button>
          )}
        </>
      )}

      {isOpenModalConfirmDeleteUserFollower && (
        <ModalConfirmDeleteUserFollower
          isOpenModalConfirmDeleteUserFollower={
            isOpenModalConfirmDeleteUserFollower
          }
          setIsOpenModalConfirmDeleteUserFollower={
            setIsOpenModalConfirmDeleteUserFollower
          }
          handleDelelteFollower={handleDelelteFollower}
          userId={user.uid}
          userFollow={userProfile}
          setIsDeleted={setIsDeleted}
        />
      )}
    </div>
  );
};

export default UserFollow;
