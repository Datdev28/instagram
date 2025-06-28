import { addDoc, collection, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { fireStore } from '../firebase/firebase';
import useBlockListStore from '../store/blockListStore';
import useAuthStore from '../store/authStore';

const useCreateBlockUser = () => {
  const [isBlocking, setIsBlocking] = useState(false);
  const addBlockerIdList = useBlockListStore(state => state.addBlockerIdList);
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

      const blockRef = collection(fireStore, 'blocks');
      const block = {
        blockerUserId,
        blockedUserId,
        createdAt: new Date()
      };
      await addDoc(blockRef, block);

      addBlockerIdList(blockerUserId, blockedUserId);

      if (user && user.uid === blockerUserId) {
        const updatedUser = {
          ...user,
          following: user.following.filter(id => id !== blockedUserId),
          followers: user.followers.filter(id => id !== blockedUserId),
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      toast.success("Đã chặn người dùng và huỷ follow thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsBlocking(false);
    }
  };

  return { handleBlockUser };
};

export default useCreateBlockUser;
