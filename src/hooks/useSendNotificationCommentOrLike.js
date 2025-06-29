import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { fireStore } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

const useSendNotificationCommentOrLike = () => {
  const [isSending, setIsSending] = useState(false);
  const handleSendNotificationComment = async(postId, posterId, InteractUserId) => {
    if(isSending) return toast.warning("Thao tác quá nhanh!");
    try {
      const newId = uuidv4();
      const notificationRef = doc(fireStore, 'users', posterId, 'notifications', newId);
      const notification = {
        postId,
        InteractUserId,
        notificationType: 'comment',
        createdAt: serverTimestamp(),
      }
      await setDoc(notificationRef, notification);
    } catch (error) {
       console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại")
    } finally {
      setIsSending(false);
    }
  }
   const handleSendNotificationLike = async(postId, posterId, InteractUserId) => {
    if(isSending) return toast.warning("Thao tác quá nhanh!");
    try {
      const newId = uuidv4();
      const notificationRef = doc(fireStore, 'users', posterId, 'notifications', newId);
      const notification = {
        postId,
        InteractUserId,
        notificationType: 'like',
        createdAt: serverTimestamp(),
      }
      await setDoc(notificationRef, notification);
    } catch (error) {
       console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại")
    } finally {
      setIsSending(false);
    }
  }
  return {handleSendNotificationComment, handleSendNotificationLike}
}

export default useSendNotificationCommentOrLike
