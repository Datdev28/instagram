import { arrayRemove, doc, increment, updateDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { useState } from "react";
import { toast } from "react-toastify";

const useDeleteComment = (postId, comment) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteComment = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const postRef = doc(fireStore, "posts", postId);
      await updateDoc(postRef, { comments: arrayRemove(comment), commentCount: increment(-1)});
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsDeleting(false);
    }
  };
  return handleDeleteComment;
};

export default useDeleteComment;
