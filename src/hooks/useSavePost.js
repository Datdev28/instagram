import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useSavePost = (postId) => {
  const user = useAuthStore((state) => state.user);
  const [isSave, setIsSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const handleSavePost = async () => {
    try {
      if (isSaving) return;
      setIsSaving(true);
      const userRef = doc(fireStore, "users", user.uid);
      if (isSave) {
        setIsSave(false);
      } else {
        setIsSave(true);
      }
      await updateDoc(userRef, {
        savePosts: isSaving ? arrayRemove(postId) : arrayUnion(postId),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };
  useEffect(() => {
    if (user) {
      console.log(user.savePosts);
      setIsSave(user.savePosts.includes(postId));
    }
  }, [user, postId]);
  return { isSaving, isSave, handleSavePost };
};

export default useSavePost;
