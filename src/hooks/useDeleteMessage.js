import { 
  doc, 
  deleteDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  updateDoc 
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";

const useDeleteMessage = () => {
  const deleteMessage = async (chatId, messageId) => {
    try {
      const messageRef = doc(fireStore, "chats", chatId, "messages", messageId);
      await deleteDoc(messageRef);
      const q = query(
        collection(fireStore, "chats", chatId, "messages"),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const snapshot = await getDocs(q);
      const latestDoc = snapshot.docs[0];

      if (latestDoc) {
        const latest = latestDoc.data();
        await updateDoc(doc(fireStore, "chats", chatId), {
          lastMessage: {
            content: latest.content || "",
            type: latest.type || "text",
            senderId: latest.senderId,
            createdAt: latest.createdAt,
          },
        });
      } else {
        await deleteDoc(doc(fireStore, "chats", chatId));
      }
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    }
  };

  return { deleteMessage };
};

export default useDeleteMessage;
