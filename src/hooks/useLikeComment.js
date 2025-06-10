import  { useState } from "react";
import useAuthStore from "../store/authStore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useLikeComment = (commentId, postId) => {
  const [liking, setLiking] = useState(false);
  const user = useAuthStore(state => state.user);
  const handleClickLike = async () => {
     setLiking(true)
    try {
      const postRef = doc(fireStore, "posts", postId);
      const document = await getDoc(postRef);
      if (!document.exists) return;
      const postData = document.data();
      const comments = postData.comments.map((comment) => {
        if (comment.id === commentId) {
          const liked = comment.likesOfComment.includes(user.uid);
          return {
            ...comment,
            likesOfComment: liked
              ? comment.likesOfComment.filter((id) => id !== user.uid)
              : [...comment.likesOfComment, user.uid],
          };
        }
        return comment
      });
      await updateDoc(postRef, {comments: comments});
    } catch (error) {
      console.log(error);
    } finally {
      setLiking(false);
    }
  };

  return {handleClickLike, liking};
};

export default useLikeComment;
