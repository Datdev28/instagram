import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useConversations = (currentUserId) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (!currentUserId) return;

    const q = query(
      collection(fireStore, "chats"),
      where("participants", "array-contains", currentUserId),
      where("lastMessage", "!=", null),
      orderBy("lastMessage.createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convos = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
        };
      });

      setConversations(convos);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  return { conversations };
};

export default useConversations;
