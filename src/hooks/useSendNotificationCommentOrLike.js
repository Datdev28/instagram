import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { fireStore } from "../firebase/firebase";

const useSendNotificationCommentOrLike = () => {
  const [isSending, setIsSending] = useState(false);

  const handleSendNotification = async (
    postId,
    posterId,
    InteractUserId,
    type = "like" // or 'comment'
  ) => {
    if (isSending) return toast.warning("Thao tác quá nhanh!");
    setIsSending(true);

    try {
      const notificationId = `${postId}_${type}`;
      const notificationRef = doc(
        fireStore,
        "users",
        posterId,
        "notifications",
        notificationId
      );

      const notification = {
        postId,
        InteractUserId,
        notificationType: type,
        createdAt: serverTimestamp(),
      };

      await setDoc(notificationRef, notification, { merge: true });
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendNotificationComment = (postId, posterId, InteractUserId) =>
    handleSendNotification(postId, posterId, InteractUserId, "comment");

  const handleSendNotificationLike = (postId, posterId, InteractUserId) =>
    handleSendNotification(postId, posterId, InteractUserId, "like");

  const handleSendNotificationFollow = async (userId, InteractUserId) => {
    if (isSending) return toast.warning("Thao tác quá nhanh!");
    setIsSending(true);

    try {
      const notificationId = `follow_${InteractUserId}`;
      const notificationRef = doc(
        fireStore,
        "users",
        userId,
        "notifications",
        notificationId
      );

      const notification = {
        InteractUserId,
        notificationType: "follow",
        createdAt: serverTimestamp(),
      };

      await setDoc(notificationRef, notification, { merge: true });
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi gửi thông báo follow");
    } finally {
      setIsSending(false);
    }
  };

  return {
    handleSendNotificationComment,
    handleSendNotificationLike,
    handleSendNotificationFollow,
  };
};

export default useSendNotificationCommentOrLike;
