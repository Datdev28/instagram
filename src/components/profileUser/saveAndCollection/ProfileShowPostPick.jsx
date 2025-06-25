import { useState } from "react";
import useGetPostByPostId from "../../../hooks/useGetPostByPostId";
import { ImCheckmark } from "react-icons/im";
const ProfileShowPostPick = ({ postId, setPickPosts, pickPosts }) => {
  const { post } = useGetPostByPostId(postId);
  const [picked, setPicked] = useState(pickPosts.includes(postId));
  const handleClickPickPost = () => {
    if (picked) {
      setPickPosts(pickPosts.filter((pickPostId) => pickPostId !== postId));
    } else {
      setPickPosts([...pickPosts, postId]);
    }
      setPicked(!picked);
  };
  return (
  post && (
    <div
      className="w-full relative cursor-pointer"
      onClick={handleClickPickPost}
    >
      <img
        src={post?.imageOfPost[0]}
        className="w-full object-cover aspect-square"
        alt="ảnh bài post"
      />
      
      {picked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-white opacity-30"></div>
          <ImCheckmark className="text-2xl text-black font-bold z-10 opacity-100"/>
        </div>
      )}
    </div>
  )
  );
};

export default ProfileShowPostPick;
