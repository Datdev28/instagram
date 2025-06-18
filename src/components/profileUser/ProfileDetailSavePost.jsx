import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import useAuthStore from "../../store/authStore";
import ProfileUserPost from "./ProfileUserPost";
import Footer from "../footer/Footer";
import userProfileStore from "../../store/userProfileStore";
import useGetProfileUserByUsername from "../../hooks/useGetProfileUserByUsername";
const ProfileDetailSavePost = ({collection = false}) => {
  const navigate = useNavigate();
  const {collectionId, username} = useParams();
  const { userProfile } = useGetProfileUserByUsername(username);
  const setUserProfile = userProfileStore((state) => state.setUserProfile);
  const user = useAuthStore((state) => state.user);
  const handleClickBackSaved = () => {
    navigate(`/${user?.userName}/saved`);
    setUserProfile(null);
  };
  useEffect(() => {
    if (user && username !== user.userName) {
      navigate(`/${username}`);
    }
  }, [username, user, navigate]);
  return (
    userProfile && (
      <div className="w-full flex flex-col items-center px-2 max-sm:mt-10 mt-4 text-white">
        <div className="flex flex-col max-w-4xl w-full gap-y-4">
          <div
            className="flex items-center gap-x-1 text-color-text-gray cursor-pointer"
            onClick={handleClickBackSaved}
          >
            <FaChevronLeft />
            <p>Đã lưu</p>
          </div>
          {userProfile?.savePosts.length > 0 ? (
            <div className="flex flex-col gap-y-2 min-h-[50vh] max-sm:min-h-[30vh]">
              <p className="text-xl text-white">Tất cả bài viết</p>
              <div className="grid grid-cols-3 gap-1 w-full">
                {userProfile &&
                  userProfile?.savePosts.map((post) => (
                    <ProfileUserPost
                      key={post}
                      postId={post}
                      showPostSave={true}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-16 gap-y-2">
              <div className="w-[4.5rem] h-[4.5rem] border-2 rounded-full flex justify-center items-center">
                <FaRegBookmark className="text-5xl" />
              </div>
              <p className="text-center text-md font-bold text-3xl mt-4">
                Bắt đầu lưu
              </p>
              <p>Lưu ảnh và video vào bộ sưu tập của bạn.</p>
            </div>
          )}
          <Footer />
        </div>
      </div>
    ) 
  );
};

export default ProfileDetailSavePost;
