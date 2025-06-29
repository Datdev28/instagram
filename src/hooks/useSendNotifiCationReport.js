import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { fireStore } from '../firebase/firebase';
const useSendNotifiCationReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sendNotificationBanned = async(userTargetId, reportType, reason, penaltyType) => {
    if(isLoading) return;
    setIsLoading(true);
    try {
      const newId = uuidv4();
      const notificationRef = doc(fireStore, 'users', userTargetId, 'notifications', newId);
      const content = penaltyType === 'comment'
      ? 'Bạn đã bị cấm bình luận trong 3 phút do vi phạm.'
      : penaltyType === 'post'
      ? 'Bạn đã bị cấm đăng bài trong 3 phút do vi phạm.'
      : 'Bạn đã bị cấm bình luận và đăng bài trong 3 phút do vi phạm.';
      const notification = {
        reportType,
        reason,
        content,
        notificationType: 'admin',
        createdAt: serverTimestamp(),
      }
      await setDoc(notificationRef, notification);
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!")
    }
  }
  return {sendNotificationBanned}
 
}

export default useSendNotifiCationReport
