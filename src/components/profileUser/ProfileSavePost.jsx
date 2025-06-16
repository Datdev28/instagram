import useGetPostByPostId from "../../hooks/useGetPostByPostId";

const ProfileSavePost = ({ postId, index }) => {
  const { post } = useGetPostByPostId(postId);
  if(!post) return
  return (
    <>
      <img
        src={post?.imageOfPost}
        alt="thumbnail"
        className={`absolute ${
          (index === 0 && "top-0 left-0") ||
          (index === 1 && "top-0 right-0") ||
          (index === 2 && "bottom-0 left-0") ||
          (index === 3 && "bottom-0 right-0")
        }  w-1/2 aspect-square object-cover z-10`}
      />
    </>
  );
};

export default ProfileSavePost;
