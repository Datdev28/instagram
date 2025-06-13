import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useSavePost = (postId) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isSave, setIsSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  console.log(user);
  const handleSavePost = async () => {
    try {
      if (isSaving) return;
      setIsSaving(true);
      const userRef = doc(fireStore, "users", user.uid);
      setUser({
        ...user,
        savePosts: isSave
          ? user.savePosts.filter((id) => id !== postId)
          : [...user.savePosts, postId],
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          savePosts: isSave
            ? user.savePosts.filter((id) => id !== postId)
            : [...user.savePosts, postId],
        })
      );
      await updateDoc(userRef, {
        savePosts: isSave ? arrayRemove(postId) : arrayUnion(postId),
      });
    } catch (error) {
      console.log(error);
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
