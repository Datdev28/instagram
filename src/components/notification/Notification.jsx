import convertDateTimestampAgo from "../../utils/convertDateTimestampAgo";
import useGetProfileUserById from "../../hooks/useGetProfileUserById";
import useGetPostByPostId from "../../hooks/useGetPostByPostId";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification, notificationType }) => {
  const { userProfile, isLoading } = useGetProfileUserById(
    notification?.InteractUserId
  );
  const { post, isLoading: isLoadingPost } = useGetPostByPostId(
    notification?.postId
  );
  const navigate = useNavigate();

  const handleClickGoToPost = () => {
    if(!isFollow){
      if (!post) {
        navigate("/404");
      } else {
         navigate(`/p/${post.id}`);
      }
    } 
  };

  if (notificationType === "admin") {
    return (
      <div className="flex gap-x-2 items-center">
        <img
          src="/icon_insta_loading.png"
          className="w-12 h-12 rounded-full object-cover"
          alt="instagram"
        />
        <p className="whitespace-pre-wrap break-words text-sm">
          Chúng tôi nhận thấy hành vi của bạn mang tính chất{" "}
          {notification.reason?.toLowerCase()}. {notification.content}
          <span className="text-sm text-color-text-gray">
            {" "}
            {convertDateTimestampAgo(notification.createdAt)}
          </span>
        </p>
      </div>
    );
  }

  const isComment = notification?.notificationType === "comment";
  const isLike = notification?.notificationType === "like";
  const isFollow = notification?.notificationType === "follow";

  return (
    <div
      className="flex gap-x-2 items-center cursor-pointer"
      onClick={handleClickGoToPost}
    >
      {isLoading ? (
        <div className="bg-color-note rounded-full w-11 h-11 shrink-0"></div>
      ) : (
        <img
          src={userProfile?.profilePicURL || "defaultProfilePic.jpg"} 
          className="w-11 h-11 rounded-full object-cover shrink-0"
          alt="avatar"
        />
      )}

      <p className="whitespace-pre-wrap break-words text-sm">
        <span className="font-semibold">{userProfile?.userName}</span>
        {isFollow && " đã bắt đầu theo dõi bạn."}
        {isComment && " đã bình luận bài viết của bạn."}
        {isLike &&
          (post?.likes.length > 1
            ? ` và ${post?.likes.length - 1} người khác đã thích bài viết của bạn`
            : " đã thích bài viết của bạn.")}
        <span className="text-sm text-color-text-gray ml-1">
          {convertDateTimestampAgo(notification.createdAt)}
        </span>
      </p>
       {!isFollow && (
      isLoadingPost ? (
        <div className="bg-color-note w-12 h-12 rounded-sm shrink-0"></div>
      ) : !post ? (
        <div className="bg-color-note w-12 h-12 rounded-sm shrink-0"></div>
      ) : (
        <img
          src={post?.imageOfPost[0]}
          className="w-12 h-12 object-cover rounded-sm shrink-0"
          alt="bài đăng"
        />
      )
       )}
    </div>
  );
};

export default Notification;
