import { doc, deleteDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase"; 
import { toast } from "react-toastify";

const useDeleteMessage = () => {

  const deleteMessage = async (chatId, messageId) => {
    try {
      const messageRef = doc(fireStore, "chats", chatId, "messages", messageId);
      await deleteDoc(messageRef);
    } catch(error) {
      console.log(error)
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } 
  };

  return { deleteMessage };
};

export default useDeleteMessage;
