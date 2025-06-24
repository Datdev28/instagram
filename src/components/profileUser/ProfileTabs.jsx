import { MdOutlinePadding } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegChartBar } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";
const ProfileTabs = ({ userProfile }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const handleClickCategorySave = () => {
    navigate("saved");
  };
  const handleClickCategoryDashboard = () => {
    navigate("dashboard");
  }
  const ownerProfile = username === user.userName;
  const handleClickCategoryPost = () => {
    navigate(`/${userProfile.userName}`);
  };
  return (
    <div className="flex w-full flex-col items-center text-md font-semibold">
      <hr className="border-color-dash w-full"/>
      <div>
        <div className="flex gap-x-10 max-md:gap-x-0 items-center w-full">
          <div
            className={` ${
              location.pathname === `/${userProfile.userName}`
                ? "border-t-1 border-t-amber-50 text-white max-md:text-blue-500 "
                : "text-color-text-gray"
            } flex max-md:text-2xl  gap-x-2 items-center justify-center px-2 max-md:w-full max-md:px-10 cursor-pointer py-2`}
            onClick={handleClickCategoryPost}
          >
            <MdOutlinePadding />
            <p className="max-md:hidden">BÀI VIẾT</p>
          </div>
          {ownerProfile && (
            <>
              <div
                className={` ${
                  location.pathname === `/${userProfile.userName}/saved`
                    ? "border-t-1 border-t-amber-50 text-white max-md:text-blue-500 "
                    : "text-color-text-gray"
                } flex max-md:text-2xl gap-x-2 items-center justify-center px-2 max-md:w-full max-md:px-10 cursor-pointer py-2`}
                onClick={handleClickCategorySave}
              >
                <FaRegBookmark />
                <p className="max-md:hidden">ĐÃ LƯU</p>
              </div>
              <div
                className={` ${
                 location.pathname === `/${userProfile.userName}/dashboard`
                    ? "border-t-1 border-t-amber-50 text-white max-md:text-blue-500 "
                    : "text-color-text-gray"
                } flex max-md:text-2xl gap-x-2 items-center justify-center px-2 max-md:w-full max-md:px-10 cursor-pointer py-2`}
                onClick={handleClickCategoryDashboard}
              >
                <FaRegChartBar />
                <p className="max-md:hidden">Thống kê</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileTabs;
