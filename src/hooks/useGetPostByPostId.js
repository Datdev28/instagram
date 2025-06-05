import React, { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useLoadingBarStore from "../store/loadingBarStore";

const useGetPostByPostId = ( postId ) => {
  const [post, setPost] = useState(null);
  const setProgress = useLoadingBarStore(state => state.setProgress)
  useEffect(() => {
    if(!postId) return
    const fetchPost = async () => {
      try {
        setProgress(30)
        const postRef = doc(fireStore, "posts", postId);
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
          setPost({...docSnap.data(), id:docSnap.id});
        }
      } catch (error) {
        console.log(error);
      } finally {
        setProgress(100)
      }
    };
    fetchPost();
  }, [postId]);
  return { post };
};

export default useGetPostByPostId;
