import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { fireStore } from "../firebase/firebase";

const useCreateChat = (chatId, currentUserId) => {
  const navigate = useNavigate();
  const [otherUserId, setOtherUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const [id1, id2] = chatId.split("_");
    const _otherUserId = id1 === currentUserId ? id2 : id1;
    setOtherUserId(_otherUserId);

    const checkAndCreateChat = async () => {
      const chatRef = doc(fireStore, "chats", chatId);
      const chatSnap = await getDoc(chatRef);

      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          participants: [currentUserId, _otherUserId],
          createdAt: serverTimestamp(),
        });
      } else {
        const data = chatSnap.data();
        if (!data.participants.includes(currentUserId)) {
          navigate("/404");
        }
      }

      setIsLoading(false);
    };

    if (currentUserId && _otherUserId) {
      checkAndCreateChat();
    }
  }, [chatId, currentUserId, navigate]);

  return { otherUserId, isLoading };
};
export default useCreateChat
