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
  const {userProfile} = useGetProfileUserById(userFollowId);
  const [
    isOpenModalConfirmDeleteUserFollower,
    setIsOpenModalConfirmDeleteUserFollower,
  ] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <img
          src={userProfile?.profilePicURL || "/defaultProfilePic.jpg"}
          className="w-11 h-11 rounded-full object-cover cursor-pointer"
          alt="avatar"
          onClick={() => navigate(`/${userProfile?.userName}`)}
        />
        <div className="flex flex-col">
          <p
            className="cursor-pointer"
            onClick={() => navigate(`/${userProfile?.userName}`)}
          >
            {userProfile?.userName}
          </p>
          <p className="text-color-text-gray">{userProfile?.fullName}</p>
        </div>
      </div>
      {isDeleted ? (
        <button className={`px-4 py-1 bg-color-note font-semibold rounded-md `}>
          Đã gỡ
        </button>
      ) : (
        <button
          className={`px-4 py-1 bg-color-note font-semibold rounded-md cursor-pointer`}
          onClick={() => setIsOpenModalConfirmDeleteUserFollower(true)}
        >
          Gỡ
        </button>
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
