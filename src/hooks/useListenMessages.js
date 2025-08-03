import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const PAGE_SIZE = 16;

const useListenMessages = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const firstVisibleRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const unsubscribeRef = useRef(null); // để hủy listener cũ

  useEffect(() => {
    if (!chatId) return;

    const fetchInitial = async () => {
      setLoading(true);

      // Hủy listener cũ nếu có
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
      lastTimestampRef.current =
        reversed[reversed.length - 1]?.createdAt || Timestamp.now();

      // ✅ Setup onSnapshot đúng lúc, sau khi có dữ liệu ban đầu
      const listenQuery = query(
        collection(fireStore, "chats", chatId, "messages"),
        orderBy("createdAt", "asc"),
        where("createdAt", ">", lastTimestampRef.current)
      );

      unsubscribeRef.current = onSnapshot(listenQuery, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages((prev) => {
          const existingIds = new Set(prev.map((msg) => msg.id));
          const filtered = newMessages.filter((msg) => !existingIds.has(msg.id));

          if (filtered.length > 0) {
            lastTimestampRef.current =
              filtered[filtered.length - 1].createdAt;
            return [...prev, ...filtered];
          }

          return prev;
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

  return { messages, loading, loadingMore, fetchMore, hasMore };
};

export default useListenMessages;
