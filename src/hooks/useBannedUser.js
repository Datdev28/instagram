import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'
import { toast } from 'react-toastify'
import { useState } from 'react'

const useBannedUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleBannedUser = async(userTarget, reason, type) => {
    if(isLoading) return toast.warning("Thao tác của bạn quá nhanh!");
    setIsLoading(true);
    const now = new Date();
    try {
      const bannedRef = doc(fireStore, 'users', userTarget, 'banned', type);
      await setDoc(bannedRef, {
        from: Timestamp.fromDate(now),
        reason
      });
    } catch (error) {
      console.log(error);
      toast.error('Đã xảy ra lỗi. Hãy thử lại!');
    } finally {
      setIsLoading(false);
    }
  }
  return {handleBannedUser}
}

export default useBannedUser
