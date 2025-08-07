import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDocs,
  doc,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const PAGE_SIZE = 16;

const useListenMessages = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [chatData, setChatData] = useState(null);

  const firstVisibleRef = useRef(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    const fetchInitial = async () => {
      setLoading(true);

      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }

      const q = query(
        collection(fireStore, "chats", chatId, "messages"),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE)
      );

      const snapshot = await getDocs(q);
      const docs = snapshot.docs;
      const fetched = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const reversed = fetched.reverse();

      setMessages(reversed);
      setHasMore(docs.length === PAGE_SIZE);
      firstVisibleRef.current = docs[docs.length - 1];

      // ✅ Real-time listener (full range)
      const listenQuery = query(
        collection(fireStore, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
      );

      unsubscribeRef.current = onSnapshot(listenQuery, (snapshot) => {
        setMessages((prevMessages) => {
          const updated = [...prevMessages];

          snapshot.docChanges().forEach((change) => {
            const changedMsg = { id: change.doc.id, ...change.doc.data() };

            if (change.type === "added") {
              if (!updated.find((msg) => msg.id === changedMsg.id)) {
                updated.push(changedMsg);
              }
            }

            if (change.type === "modified") {
              const index = updated.findIndex((msg) => msg.id === changedMsg.id);
              if (index !== -1) {
                updated[index] = changedMsg;
              }
            }

            if (change.type === "removed") {
              const index = updated.findIndex((msg) => msg.id === changedMsg.id);
              if (index !== -1) {
                updated.splice(index, 1);
              }
            }
          });

          return [...updated].sort(
            (a, b) => a.createdAt?.seconds - b.createdAt?.seconds
          );
        });
      });

      setLoading(false);
    };

    fetchInitial();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribeChat = onSnapshot(
      doc(fireStore, "chats", chatId),
      (docSnap) => {
        if (docSnap.exists()) {
          setChatData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setChatData(null);
        }
      }
    );

    return () => {
      unsubscribeChat();
    };
  }, [chatId]);

  const fetchMore = async () => {
    if (!chatId || !firstVisibleRef.current || !hasMore || loadingMore) return;

    setLoadingMore(true);

    const q = query(
      collection(fireStore, "chats", chatId, "messages"),
      orderBy("createdAt", "desc"),
      startAfter(firstVisibleRef.current),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    const fetched = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const reversed = fetched.reverse();

    setMessages((prev) => [...reversed, ...prev]);
    setHasMore(docs.length === PAGE_SIZE);
    firstVisibleRef.current = docs[docs.length - 1];
    setLoadingMore(false);
  };

  return { messages, loading, loadingMore, fetchMore, hasMore, chatData };
};

export default useListenMessages;
