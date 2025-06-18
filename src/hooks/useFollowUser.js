import { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { fireStore } from "../firebase/firebase";
import userProfileStore from "../store/userProfileStore";
import { toast } from "react-toastify";
const useFollowUser = (userId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuthStore();
  const { userProfile, setUserProfile } = userProfileStore();
  const handleFollowUser = async () => {
    if (!user) return;
    if(isLoading) return
    try {
      setIsLoading(true);
      const currentUserRef = doc(fireStore, "users", user.uid);
      const trackedPersonRef = doc(fireStore, "users", userId);
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(trackedPersonRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      if (isFollowing) {
        if (userProfile) {
          const filterFollowing = user.following.filter(
            (uid) => uid !== userId
          );
          const filterFollowers = userProfile.followers.filter(
            (uid) => uid !== user.uid
          );
          setUser({ ...user, following: filterFollowing });
          setUserProfile({ ...userProfile, followers: filterFollowers });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, following: filterFollowing })
          );
          setIsFollowing(false);
        }
      } else {
        if (userProfile) {
          setUser({ ...user, following: [...user.following, userId] });
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, user.uid],
          });

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              following: [...user.following, userId],
            })
          );
          setIsFollowing(true);
        }
      }
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!user) return;
    const isUserFollowing = user.following.includes(userId);
    setIsFollowing(isUserFollowing);
  }, [userId, user]);
  return { isLoading, isFollowing, handleFollowUser };
};

export default useFollowUser;
