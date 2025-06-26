import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import useFollowUser from "../../hooks/useFollowUser";
const UserFollowing = ({ userFollwingId }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const {
    isLoading: isLoadingFollow,
    isFollowing,
    handleFollowUser,
  } = useFollowUser(userFollwingId);
  const { userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileUserById(userFollwingId);
  return (
    <div className="flex justify-between items-center">
      {isLoadingUserProfile ? (
        <>
          <div className="animate-pulse w-full flex items-center gap-x-2">
            <div className="w-12 h-12 bg-color-note rounded-full"></div>
            <div className="flex flex-col justify-center gap-y-1">
              <div className="bg-color-note rounded w-40 h-5"></div>
              <div className="bg-color-note rounded w-30 h-5"></div>
            </div>
          </div>
          <button className="w-22 h-8 opacity-0 bg-color-note rounded-md font-semibold">
            Đang theo dõi
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
          {userFollwingId !== user.uid && (
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
          )}
        </>
      )}
    </div>
  );
};

export default UserFollowing;
