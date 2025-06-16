import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import ProfileUserPost from "./ProfileUserPost";
import Footer from "../footer/Footer";
const ProfileDetailSavePost = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const user = useAuthStore((state) => state.user);
  const handleClickBackSaved = () => {
    navigate(`/${user?.userName}/saved`);
  };
  useEffect(() => {
    if (user && username !== user.userName) {
      navigate(`/${username}`);
    }
  }, [username, user, navigate]);
  return (
    <div className="w-full flex flex-col items-center px-2 max-sm:mt-10 mt-4 ">
      <div className="flex flex-col max-w-4xl w-full gap-y-4">
        <div
          className="flex items-center gap-x-1 text-color-text-gray cursor-pointer"
          onClick={handleClickBackSaved}
        >
          <FaChevronLeft />
          <p>Đã lưu</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-xl text-white">Tất cả bài viết</p>
          <div className="grid grid-cols-3 gap-1 w-full">
            {user &&
              user.savePosts.length > 0 &&
              user?.savePosts.map((post) => (
                <ProfileUserPost
                  key={post.id}
                  postId={post}
                  showPostSave={true}
                />
              ))}
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default ProfileDetailSavePost;
