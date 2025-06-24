import { arrayRemove, arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";
const useLikePost = (post) => {
  const [isLiking, setIsLiking] = useState(false);
  const user = useAuthStore((state) => state.user);
  const handleLikePost = async () => {
    setIsLiking(true);
    try {
      const postRef = doc(fireStore, "posts", post.id);
      const liked = post.likes.some((like) => like.userId === user.uid);
      await updateDoc(postRef, {
        likes: liked
          ? arrayRemove({
              userId: user.uid,
              userName: user.userName,
              profilePicURL: user.profilePicURL,
              fullName: user.fullName,
            })
          : arrayUnion({
              userId: user.uid,
              userName: user.userName,
              profilePicURL: user.profilePicURL,
              fullName: user.fullName,
              // likeCount: increment(1)
            }), 
        likeCount: liked ? increment(-1) : increment(1),
      });
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsLiking(false);
    }
  };
  return { handleLikePost, isLiking };
};

export default useLikePost;
