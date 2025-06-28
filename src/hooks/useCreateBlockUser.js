import { doc, setDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { fireStore } from "../firebase/firebase";
import useBlockListStore from "../store/blockListStore";
import useAuthStore from "../store/authStore";

const getBlockDocId = (blockerId, blockedId) => `${blockerId}_${blockedId}`;

const useCreateBlockUser = () => {
  const [isBlocking, setIsBlocking] = useState(false);
  const addBlockedId = useBlockListStore((state) => state.addBlockedId);
  const { user, setUser } = useAuthStore();

  const handleBlockUser = async (blockerUserId, blockedUserId) => {
    if (isBlocking) return toast.warning("Thao tác quá nhanh!");
    setIsBlocking(true);

    try {
      const currentUserRef = doc(fireStore, "users", blockerUserId);
      const blockedUserRef = doc(fireStore, "users", blockedUserId);

      await updateDoc(currentUserRef, {
        following: arrayRemove(blockedUserId),
        followers: arrayRemove(blockedUserId),
      });

      await updateDoc(blockedUserRef, {
        following: arrayRemove(blockerUserId),
        followers: arrayRemove(blockerUserId),
      });

      const blockDocId = getBlockDocId(blockerUserId, blockedUserId);
      const blockDocRef = doc(fireStore, "blocks", blockDocId);

      await setDoc(blockDocRef, {
        blockerUserId,
        blockedUserId,
      });

      addBlockedId(blockedUserId);

      if (user && user.uid === blockerUserId) {
        const updatedUser = {
          ...user,
          following: user.following.filter((id) => id !== blockedUserId),
          followers: user.followers.filter((id) => id !== blockedUserId),
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      toast.success("Đã chặn người dùng và huỷ follow thành công!");
    } catch (error) {
      console.error("Block user error:", error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsBlocking(false);
    }
  };

  return { handleBlockUser };
};

export default useCreateBlockUser;
