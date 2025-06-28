import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
const UserLike = ({ userLike }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { isLoading, isFollowing, handleFollowUser } = useFollowUser(userLike);
  const { userProfile, isLoading: isGetting } = useGetProfileUserById(userLike);
  return (
    <div className="flex justify-between items-center">
      {isGetting ? (
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
          {user?.uid !== userProfile?.uid && (
            <button
              className={`px-4 py-1 ${
                isFollowing
                  ? "bg-color-note hover:bg-color-dash"
                  : "hover:bg-blue-700"
              } bg-blue-500 font-semibold rounded-md cursor-pointer`}
              onClick={handleFollowUser}
            >
              {isLoading ? (
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

export default UserLike;
