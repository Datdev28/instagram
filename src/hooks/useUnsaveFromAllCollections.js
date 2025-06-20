import {
  arrayRemove,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useCollectionPostStore from "../store/collectionSaveStore";

const useUnsaveFromAllCollections = (postId) => {
  const user = useAuthStore((state) => state.user);
  const unsavePostFromAllCollections = useCollectionPostStore(state => state.unsavePostFromAllCollections);
  const handleUnsaveFromAllCollections = async () => {
    try {
      const userRef = collection(fireStore, "users", user.uid, "collections");
      const querySnapshot = await getDocs(userRef);
      if (!querySnapshot.empty) throw new Error("Bộ sưu tập trống!");
      const unsavePromises = querySnapshot.docs.map(async (docSnap) => {
        console.log("123", docSnap.data().pickedPosts);
        try {
          await updateDoc(docSnap, { pickedPosts: arrayRemove(postId) });
        } catch (error) {
          console.log(error);
          toast.error("Đã xảy ra lỗi! Hãy thử lại");
        }
      });
      await Promise.all(unsavePromises);
      unsavePostFromAllCollections(postId);
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    }
  };
  return { handleUnsaveFromAllCollections };
};

export default useUnsaveFromAllCollections;
