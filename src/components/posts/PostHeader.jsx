import { LuDot } from "react-icons/lu";
import convertDateTime from "../../utils/convertDateTime";
import { useNavigate } from "react-router-dom";
const PostHeader = ({ poster }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between text-white text-md items-center ">
        <div className="flex gap-x-2 items-center h-[33px]">
          <img
            src={poster?.byAvaUser || `defaultProfilePic.jpg`}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            alt="ảnh đại diện"
            onClick={() => navigate(`/${poster?.byUserName}`)}
          />
          <div className="flex items-center">
            <p
              className="cursor-pointer"
              onClick={() => navigate(`/${poster?.byUserName}`)}
            >
              {poster?.byUserName}
            </p>
            <LuDot className="mt-1 text-color-text-gray" />
            <span className="text-color-text-gray">
              {convertDateTime(poster?.createdAt)}
            </span>
          </div>
        </div>
    </div>
  );
};

export default PostHeader;
