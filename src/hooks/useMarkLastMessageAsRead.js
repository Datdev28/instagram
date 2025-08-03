import { doc, updateDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const markLastMessageAsRead = async (chatId) => {
  const convoRef = doc(fireStore, "chats", chatId);
  await updateDoc(convoRef, {
    "lastMessage.isReaded": true,
  });
};

export default markLastMessageAsRead;