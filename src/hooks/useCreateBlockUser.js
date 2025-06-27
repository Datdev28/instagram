import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { fireStore } from '../firebase/firebase';
import useBlockListStore from '../store/blockListStore';

const useCreateBlockUser = () => {
  const [isBlocking, setIsBlocking] = useState(false);
  const addBlockedIdList = useBlockListStore(state => state.addBlockedIdList)
  const handleBlockUser = async(blockerUserId, blockedUserId) => {
    if(isBlocking) return toast.warning("Thao tác quá nhanh!");
    setIsBlocking(true);
    try {
      const blockRef = collection(fireStore, 'blocks');
      const block = {
        blockerUserId,
        blockedUserId,
      }
      await addDoc(blockRef, block);
      addBlockedIdList(blockedUserId);
      toast.success("Thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!")
    }
  }
  return {handleBlockUser}
}

export default useCreateBlockUser
