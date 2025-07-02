import { LuDot } from "react-icons/lu";
import useGetProfileUserById from "../../hooks/useGetProfileUserById"
import convertDateTime from "../../utils/convertDateTime";
import { useNavigate } from "react-router-dom";
const PostHeader = ({poster, createdAt}) => {
const {userProfile} = useGetProfileUserById(poster);
const navigate = useNavigate()

  return (
    <div className="flex justify-between text-white text-md items-center ">
      <div className="flex gap-x-2 items-center">
        <img
          src={userProfile?.profilePicURL || `defaultProfilePic.jpg`}
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
          alt="ảnh đại diện"
          onClick={() => navigate(`/${userProfile.userName}`)}
        />
        <div className="flex items-center">
          <p className="cursor-pointer"
          onClick={() => navigate(`/${userProfile.userName}`)}
          >{userProfile?.userName}</p>
          <LuDot className="mt-1 text-color-text-gray"/>
          <span className="text-color-text-gray">{convertDateTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
