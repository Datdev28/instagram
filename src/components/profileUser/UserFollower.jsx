  import { useNavigate, useParams } from "react-router-dom";
  import useAuthStore from "../../store/authStore";
  import useGetProfileUserById from "../../hooks/useGetProfileUserById";
  import useDeleteUserFollowers from "../../hooks/useDeleteUserFollowers";
  import { useState } from "react";
  import ModalConfirmDeleteUserFollower from "../modal/ModalConfirmDeleteUserFollower";
  import useFollowUser from "../../hooks/useFollowUser";
  const UserFollower = ({ userFollowerId }) => {
    const { username } = useParams();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const { handleDeleteFollower } = useDeleteUserFollowers();
    const {
      isLoading: isLoadingFollow,
      isFollowing,
      handleFollowUser,
    } = useFollowUser(userFollowerId);
    const { userProfile, isLoading } = useGetProfileUserById(userFollowerId);
    const [
      isOpenModalConfirmDeleteUserFollower,
      setIsOpenModalConfirmDeleteUserFollower,
    ] = useState(false);
    const notOwnProfileUser = user.userName !== username;
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
            <button className="w-22 h-8 opacity-0 bg-color-note rounded-md font-semibold">
              xóa
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
                  className="cursor-pointer w-40 h-5 whitespace-nowrap"
                  onClick={() => navigate(`/${userProfile?.userName}`)}
                >
                  {userProfile?.userName}
                </p>
                <p className="text-color-text-gray w-30 h-5 text-sm whitespace-nowrap">
                  {userProfile?.fullName}
                </p>
              </div>
            </div>
            {notOwnProfileUser ? (
              <button
                className={`h-8 px-2 whitespace-nowrap ${
                  isFollowing ? "bg-color-note" : "bg-blue-500"
                }  font-semibold rounded-md cursor-pointer`}
                onClick={handleFollowUser}
              >
                {isLoadingFollow ? (
                  <img
                    className="object-cover w-7 h-7 rounded-full"
                    src="/loading.gif"
                    alt="gif"
                  />
                ) : isFollowing ? (
                  "Đang theo dõi"
                ) : (
                  "Theo dõi"
                )}
              </button>
            ) : (
              !notOwnProfileUser &&
              (isDeleted ? (
                <button
                  className={`w-22 h-8 px-2 bg-color-note opacity-50 font-semibold rounded-md `}
                >
                  Đã xóa
                </button>
              ) : (
                <button
                  className={` w-22 h-8 px-2 bg-color-note font-semibold rounded-md cursor-pointer`}
                  onClick={() => setIsOpenModalConfirmDeleteUserFollower(true)}
                >
                  Xóa
                </button>
              ))
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
            handleDeleteFollower={handleDeleteFollower}
            userId={user.uid}
            userFollow={userProfile}
            setIsDeleted={setIsDeleted}
          />
        )}
      </div>
    );
  };

  export default UserFollower;
