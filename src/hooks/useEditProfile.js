import { useState } from "react";
import useAuthStore from "../store/authStore";
import { fireStore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import { toast } from "react-toastify";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const editProfile = async (inputs, imageURL) => {
    if (isUpdating || !authUser) return;

    setIsUpdating(true);

    try {
      const userDocRef = doc(fireStore, "users", authUser.uid);

      const q = query(
        collection(fireStore, "users"),
        where("userName", "==", inputs.userName)
      );
      const querySnapShot = await getDocs(q);
      const duplicateUsers = querySnapShot.docs.filter(
        (doc) => doc.id !== authUser.uid
      );
      if (duplicateUsers.length > 0) {
        return true; 
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        userName: inputs.userName || authUser.userName,
        bio: inputs.bio || authUser.bio,
        profilePicURL: imageURL[0] || authUser.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);

      const postsQuery = query(
        collection(fireStore, "posts"),
        where("createBy", "==", authUser.uid)
      );
      const postsSnapshot = await getDocs(postsQuery);

      const updatePosts = postsSnapshot.docs.map((docSnap) => {
        const postRef = doc(fireStore, "posts", docSnap.id);
        return updateDoc(postRef, {
          byUserName: updatedUser.userName,
          byAvaUser: updatedUser.profilePicURL,
        });
      });
      await Promise.all(updatePosts);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);

      return false;
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsUpdating(false);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
