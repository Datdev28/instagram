import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useSavePost = (postId) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isSave, setIsSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePost = async () => {
    try {
      if (isSaving) return;
      setIsSaving(true);

      const userRef = doc(fireStore, "users", user.uid);
      const savedByRef = doc(fireStore, "posts", postId, "savedBy", user.uid);

      const updatedSavePosts = isSave
        ? user.savePosts.filter((id) => id !== postId)
        : [...user.savePosts, postId];

      const updatedUser = { ...user, savePosts: updatedSavePosts };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      await updateDoc(userRef, {
        savePosts: isSave ? arrayRemove(postId) : arrayUnion(postId),
      });

      if (isSave) {
        await deleteDoc(savedByRef);
      } else {
        console.log("đã gọi setdoc")
        await setDoc(savedByRef, {
          userId: user.uid,
          userName: user.userName,
        });
      }
    } catch (error) {
      console.log("Error when saving post:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (user) {
      setIsSave(user.savePosts.includes(postId));
    }
  }, [user, postId]);

  return { isSaving, isSave, handleSavePost };
};

export default useSavePost;
