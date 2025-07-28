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

  useEffect(() => {
    if (!chatId) return;

    const fetchInitial = async () => {
      setLoading(true);
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
      lastTimestampRef.current = reversed[reversed.length - 1]?.createdAt || Timestamp.now();
      setLoading(false);
    };

    fetchInitial();
  }, [chatId]);

  useEffect(() => {
    if (!chatId || !lastTimestampRef.current) return;

    const q = query(
      collection(fireStore, "chats", chatId, "messages"),
      orderBy("createdAt", "asc"),
      where("createdAt", ">", lastTimestampRef.current)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (newMessages.length > 0) {
        setMessages((prev) => [...prev, ...newMessages]);
        lastTimestampRef.current = newMessages[newMessages.length - 1].createdAt;
      }
    });

    return () => unsubscribe();
  }, [chatId, messages.length]);

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
