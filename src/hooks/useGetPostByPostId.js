import { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

const useGetPostByPostId = ( postId ) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
  if (!postId) return;
    const postRef = doc(fireStore, "posts", postId);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        setPost({ ...docSnap.data(), id: docSnap.id });
      }
      setIsLoading(false);

    }, (error) => {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [postId]);
  return { post, isLoading };
};

export default useGetPostByPostId;
