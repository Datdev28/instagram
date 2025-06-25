import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";
const useMostInteractedPost = (userId) => {
  const [mostPostLike, setMostPostLike] = useState(null);
  const [isGetting, setIsGetting] = useState(false);
  const fetchMostInteractedPost = async () => {
    try {
      const postRef = query(
        collection(fireStore, "posts"),
        where("createBy", "==", userId),
        orderBy("likeCount", "desc"),
        limit(1)
      );
      const snapShot = await getDocs(postRef);
      const doc = snapShot.docs[0];
      if (doc) {
        setMostPostLike({ ...doc.data(), id: doc.id });
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsGetting(true);
    }
  };
  useEffect(() => {
    fetchMostInteractedPost();
  }, [userId]);

  return { mostPostLike, isGetting };
};

export default useMostInteractedPost;
