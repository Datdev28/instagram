import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";

const useGetPostFromArray = (postId) => {
  const posts = usePostStore((state) => state.posts);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const handleGetNeedPost = () => {
      if(!posts || posts.length === 0) return; 
      const needPost = posts.find((item) => item.id === postId);
      setPost(needPost);
    };
    handleGetNeedPost();
  }, [postId, posts]);

  return post;
};

export default useGetPostFromArray;
