import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { fireStore } from '../firebase/firebase';

const useDeleteUserFollowers = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelelteFollower = async(userIdFollower, userId) => {
    console.log("userIdFollower", userIdFollower);
    console.log(userId);
    try {
      if(isDeleting) return toast.warning("Thao tác quá nhanh!");
      setIsDeleting(true);
      const userRef = doc(fireStore, 'users', userId);
      await updateDoc(userRef, {followers: arrayRemove(userIdFollower)});
      toast.success("Đã xóa thành công")
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsDeleting(false);
    }

  }
  return {handleDelelteFollower, isDeleting}
}

export default useDeleteUserFollowers
