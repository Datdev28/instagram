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
    if (isLoading) return toast.warning("Thao tác quá nhanh!");
    
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
        const updatedFollowing = user.following.filter(uid => uid !== userId);
        const updatedUser = { ...user, following: updatedFollowing };
        
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        if (userProfile && userProfile.uid === userId) {
          const updatedFollowers = userProfile.followers.filter(uid => uid !== user.uid);
          setUserProfile({ ...userProfile, followers: updatedFollowers });
        }
        
        setIsFollowing(false);
      } else {
        const updatedFollowing = [...user.following, userId];
        const updatedUser = { ...user, following: updatedFollowing };
        
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        if (userProfile && userProfile.uid === userId) {
          const updatedFollowers = [...userProfile.followers, user.uid];
          setUserProfile({ ...userProfile, followers: updatedFollowers });
        }
        
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !userId) return;
    const isUserFollowing = user.following.includes(userId);
    setIsFollowing(isUserFollowing);
  }, [userId, user]);

  return { isLoading, isFollowing, handleFollowUser };
};

export default useFollowUser;