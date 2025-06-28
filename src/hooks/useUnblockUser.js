import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { fireStore } from '../firebase/firebase'
import { toast } from 'react-toastify';
import useBlockListStore from '../store/blockListStore';

const useUnblockUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const removeBlockedId = useBlockListStore(state => state.removeBlockedId);
  const handleUnblockUser = async(blockerUserId, blockedUserId) => {
    if(isLoading) return "Thao tác quá nhanh!"
    setIsLoading(true);
    console.log(`${blockerUserId}_${blockedUserId}`)
    try {
      const blockRef = doc(fireStore, 'blocks', `${blockerUserId}_${blockedUserId}`);
      await deleteDoc(blockRef);
      removeBlockedId(blockedUserId);
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return {handleUnblockUser}
}

export default useUnblockUser
