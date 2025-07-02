import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import usePostStore from "../store/postStore"

const useGetFeedPosts = () => {
  const { feedPosts, setFeedPosts, appendFeedPosts } = usePostStore()
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitialPosts = async () => {
    setLoading(true);
    const q = query(
      collection(fireStore, "posts"),
      orderBy("createdAt", "desc"),
      limit(6)
    );
    const snap = await getDocs(q);
    const newPosts = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFeedPosts(newPosts); 
    setLastDoc(snap.docs[snap.docs.length - 1]);
    setHasMore(snap.docs.length === 6);
    setLoading(false);
  };

  const fetchMorePosts = async () => {
    if (!lastDoc || !hasMore || loading) return;
    setLoading(true);
    const q = query(
      collection(fireStore, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(6)
    );
    const snap = await getDocs(q);
    const newPosts = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    appendFeedPosts(newPosts); 
    setLastDoc(snap.docs[snap.docs.length - 1]);
    setHasMore(snap.docs.length === 6);
    setLoading(false);
  };

  useEffect(() => {
    if(feedPosts.length === 0) fetchInitialPosts();
  }, []);

  return { feedPosts, fetchMorePosts, loading, hasMore };
};

export default useGetFeedPosts;
