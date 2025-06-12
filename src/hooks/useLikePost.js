import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
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
            }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLiking(false);
    }
  };
  return { handleLikePost, isLiking };
};

export default useLikePost;
