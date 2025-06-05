import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";

const useGetRelatedPosts = (userUid, postId) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (!userUid || !postId) return;
    const getRelatedPosts = async () => {
      try {
        const q = query(
          collection(fireStore, "posts"),
          where("createBy", "==", userUid),
          orderBy("createBy"),
          limit(6)
        );
        const querySnapShot = await getDocs(q);
        const posts = [];
        querySnapShot.forEach((item) => {
          if (item.id !== postId) {
            posts.push({...item.data(), id: item.id});
          }
        });
        setRelatedPosts(posts);
      } catch (error) {
        console.log(error);
      }
    };
    getRelatedPosts();
  }, [postId, userUid]);
  return { relatedPosts };
};

export default useGetRelatedPosts;
