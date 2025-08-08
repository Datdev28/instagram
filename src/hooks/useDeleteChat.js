import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { fireStore } from "../firebase/firebase"; 
import { toast } from "react-toastify";
import { useState } from "react";

const useDeleteChat = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteChat = async (chatId) => {
    if(isDeleting) return
    try {
      setIsDeleting(true);
      const messagesRef = collection(fireStore, "chats", chatId, "messages");
      const snapshot = await getDocs(messagesRef);
      const deleteMessagePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(docSnap.ref)
      );
      await Promise.all(deleteMessagePromises);
      const chatDocRef = doc(fireStore, "chats", chatId);
      await deleteDoc(chatDocRef);
    } catch {
      toast.error("Đã xảy ra lỗi khi xóa đoạn chat.");
    } finally {
      setIsDeleting(false)
    }
  };

  return { deleteChat, isDeleting };
};

export default useDeleteChat;
