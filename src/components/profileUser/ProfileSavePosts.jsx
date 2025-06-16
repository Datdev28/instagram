import userProfileStore from "../../store/userProfileStore";
import ProfileSavePost from "./ProfileSavePost";
const ProfileSavePosts = () => {
  const userProfile = userProfileStore(state => state.userProfile);
  return (
    <div className="w-full flex flex-col mt-4 gap-y-6">
      <div className="flex justify-between items-center max-sm:px-4 whitespace-nowrap max-sm:gap-x-4">
        <p className="text-color-text-gray text-xs">
          Chỉ mình bạn mới có thể xem mục đã lưu
        </p>
        <p className="cursor-pointer text-blue-500 max-sm:text-xs">
          + Bộ sưu tập mới
        </p>
      </div>
      <div className="flex max-sm:justify-center">
        <div className="w-[280px] h-[280px] relative border border-color-btn-gray cursor-pointer group">
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity z-20" />
            {userProfile && userProfile.savePosts.slice(0,4).map((postId, index) => (
             <ProfileSavePost postId={postId} index={index}/>
            ))}
          <p className="absolute bottom-6 left-6 z-30 text-white font-semibold">
            Tất cả bài viết
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSavePosts;
