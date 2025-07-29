import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
    console.log(imageUrls);
    try {
      const messageCollection = collection(
        fireStore,
        "chats",
        chatId,
        "messages"
      );

      if (content.trim()) {
        if (content === "❤️") {
          await addDoc(messageCollection, {
            senderId,
            type: "icon",
            content,
            createdAt: serverTimestamp(),
          });
        } else {
          await addDoc(messageCollection, {
            senderId,
            type: "text",
            content,
            createdAt: serverTimestamp(),
          });
        }
      }

      for (const url of imageUrls) {
        await addDoc(messageCollection, {
          senderId,
          type: "image",
          imageUrls: [url],
          createdAt: serverTimestamp(),
        });
      }

      if (voiceUrl) {
        await addDoc(messageCollection, {
          senderId,
          type: "voice",
          voiceUrl,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      toast.error("Gửi tin nhắn thất bại!");
      console.error("Lỗi gửi message:", error);
    }
  };

  return { sendMessage };
};

export default useSendMessage;
