import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { fireStore } from '../firebase/firebase';
import { toast } from 'react-toastify';

const useUpdatePost = (post, valueText) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const handleUpdatePost = async() => {
    if(isUpdating) return;
    setIsUpdating(true);
    try {
    const postRef = doc(fireStore, 'posts', post.id);
    await updateDoc(postRef, {caption: valueText});
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsUpdating(false);
    }
  }
  return {isUpdating, handleUpdatePost}
}

export default useUpdatePost
