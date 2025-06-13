import { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import useLoadingBarStore from "../store/loadingBarStore";

const useGetPostByPostId = ( postId ) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const setProgress = useLoadingBarStore(state => state.setProgress)
 useEffect(() => {
  if (!postId) return;
    setProgress(30);
    const postRef = doc(fireStore, "posts", postId);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        setPost({ ...docSnap.data(), id: docSnap.id });
      }
      setProgress(100);
      setIsLoading(false);

    }, (error) => {
      console.log("Realtime error:", error);
      setProgress(100);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [postId]);
  return { post, isLoading };
};

export default useGetPostByPostId;
