import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";
const UserLike = ({ userLike }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { isLoading, isFollowing, handleFollowUser } = useFollowUser(
    userLike.userId
  );
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <img
          src={userLike.profilePicURL || "/defaultProfilePic.jpg"}
          className="w-11 h-11 rounded-full object-cover cursor-pointer"
          alt="avatar"
          onClick={() => navigate(`/${userLike.userName}`)}
        />
        <div className="flex flex-col">
          <p
            className="cursor-pointer"
            onClick={() => navigate(`/${userLike.userName}`)}
          >
            {userLike.userName || "Người dùng Instagram"} 
          </p>
          <p className="text-color-text-gray">{userLike.fullName}</p>
        </div>
      </div>
      {user?.uid !== userLike.userId && (
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
    </div>
  );
};

export default UserLike;
