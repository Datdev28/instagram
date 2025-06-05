import React, { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const useGetPostByPostId = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(postId)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const postRef = doc(fireStore, "posts", postId);
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
          setPost({...docSnap.data(), id:docSnap.id});
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);
  return { post, isLoading };
};

export default useGetPostByPostId;
