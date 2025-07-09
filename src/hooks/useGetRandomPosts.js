import {
  collection,
  query,
  orderBy,
  getDocs,
  startAfter,
  limit,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { useState, useCallback } from "react";
import usePostStore from "../store/postStore";

const POST_LIMIT = 12;

const useGetRandomPosts = () => {
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { randomPosts, setRandomPosts, appendRandomPosts } = usePostStore();

  const fetchRandomPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      const FETCH_SIZE = POST_LIMIT * 3;
      
      let q = query(
        collection(fireStore, "posts"),
        orderBy("createdAt", "desc"), 
        limit(FETCH_SIZE)
      );
      
      if (lastDoc) {
        q = query(
          collection(fireStore, "posts"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(FETCH_SIZE)
        );
      }
      
      const snap = await getDocs(q);
      
      if (snap.empty) {
        setHasMore(false);
        return;
      }
      
      const posts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      const shuffled = posts.sort(() => 0.5 - Math.random());
      const selectedPosts = shuffled.slice(0, POST_LIMIT);
      
      setLastDoc(snap.docs[snap.docs.length - 1]);
      
      if (randomPosts.length === 0) {
        setRandomPosts(selectedPosts);
      } else {
        const existingIds = new Set(randomPosts.map((p) => p.id));
        const uniquePosts = selectedPosts.filter((p) => !existingIds.has(p.id));
        
        if (uniquePosts.length > 0) {
          appendRandomPosts(uniquePosts);
        }
      }
      
      if (posts.length < FETCH_SIZE) {
        setHasMore(false);
      }
      
    } catch (err) {
      console.error("Lỗi khi lấy bài random:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastDoc, randomPosts, setRandomPosts, appendRandomPosts]);

  const resetRandomPosts = useCallback(() => {
    setLastDoc(null);
    setHasMore(true);
    setRandomPosts([]);
  }, [setRandomPosts]);

  return { 
    fetchRandomPosts, 
    loading, 
    hasMore,
    resetRandomPosts 
  };
};

export default useGetRandomPosts;