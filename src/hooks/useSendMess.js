import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { toast } from "react-toastify";

const useSendMessage = () => {
  const sendMessage = async (
    chatId,
    senderId,
    content = "",
    imageUrls = [],
    voiceUrl = ""
  ) => {
    try {
      const messageCollection = collection(
        fireStore,
        "chats",
        chatId,
        "messages"
      );

      let lastMessageRef = null;

      if (content.trim()) {
        const type = content === "❤️" ? "icon" : "text";
        lastMessageRef = await addDoc(messageCollection, {
          senderId,
          type,
          content,
          createdAt: serverTimestamp(),
          seenBy: [],
        });
      }

      for (const url of imageUrls) {
        lastMessageRef = await addDoc(messageCollection, {
          senderId,
          type: "image",
          imageUrls: [url],
          createdAt: serverTimestamp(),
          seenBy: [],
        });
      }

      if (voiceUrl) {
        lastMessageRef = await addDoc(messageCollection, {
          senderId,
          type: "voice",
          voiceUrl,
          createdAt: serverTimestamp(),
          seenBy: [],
        });
      }

      if (lastMessageRef) {
        const snap = await getDoc(lastMessageRef);
        const lastMessageData = snap.data();

        const chatDocRef = doc(fireStore, "chats", chatId);
        await updateDoc(chatDocRef, {
          lastMessage: {
            senderId: lastMessageData.senderId,
            type: lastMessageData.type,
            content: lastMessageData.content || "",
            createdAt: lastMessageData.createdAt,
            seenBy: [],
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Gửi tin nhắn thất bại!");
    }
  };

  return { sendMessage };
};

export default useSendMessage;
