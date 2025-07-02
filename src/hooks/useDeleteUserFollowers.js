import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { fireStore } from '../firebase/firebase';
import userProfileStore from '../store/userProfileStore';

const useDeleteUserFollowers = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {userProfile, setUserProfile} = userProfileStore()
  const handleDeleteFollower = async(userIdFollower, userId) => {
    console.log("userIdFollower", userIdFollower);
    console.log(userId);
    try {
      if(isDeleting) return toast.warning("Thao tác quá nhanh!");
      setIsDeleting(true);
      const userRef = doc(fireStore, 'users', userId);
      const userFollowerRef = doc(fireStore, 'users', userIdFollower);
      const updatedFollowers = userProfile?.followers.filter(uid => uid !== userIdFollower);
      await updateDoc(userRef, {followers: arrayRemove(userIdFollower)});
      await updateDoc(userFollowerRef, {following: arrayRemove(userId)});
      setUserProfile({ ...userProfile, followers: updatedFollowers });
      toast.success("Đã xóa thành công")
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsDeleting(false);
    }

  }
  return {handleDeleteFollower, isDeleting}
}

export default useDeleteUserFollowers
