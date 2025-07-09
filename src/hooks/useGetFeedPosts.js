import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import useBlockListStore from "../store/blockListStore";

const POST_LIMIT = 6;

const useGetFeedPosts = () => {
  const { feedPosts, setFeedPosts, appendFeedPosts } = usePostStore();
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialFetched, setInitialFetched] = useState(false);

  const { blockedIdList, blockerIdList, isLoading: blockListLoading } = useBlockListStore();

  const filterBlockedPosts = (posts) => {
    if (blockedIdList.length === 0 && blockerIdList.length === 0) return posts;
    const blockedSet = new Set([...blockedIdList, ...blockerIdList]);
    return posts.filter((post) => !blockedSet.has(post.createBy));
  };

  const fetchInitialPosts = async () => {
    try {
      const q = query(
        collection(fireStore, "posts"),
        orderBy("createdAt", "desc"),
        limit(POST_LIMIT)
      );

      const snap = await getDocs(q);
      const rawPosts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredPosts = filterBlockedPosts(rawPosts);
      setFeedPosts(filteredPosts);
      setLastDoc(snap.docs[snap.docs.length - 1]);
      setHasMore(snap.docs.length === POST_LIMIT);
      setInitialFetched(true);
    } catch (error) {
      console.error("Lỗi khi tải bài viết ban đầu:", error);
    }
  };

  const fetchMorePosts = async () => {
    if (!lastDoc || !hasMore || loading) return;
    setLoading(true);

    try {
      const q = query(
        collection(fireStore, "posts"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(POST_LIMIT)
      );

      const snap = await getDocs(q);
      const rawPosts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredPosts = filterBlockedPosts(rawPosts);
      appendFeedPosts(filteredPosts);
      setLastDoc(snap.docs[snap.docs.length - 1]);
      setHasMore(snap.docs.length === POST_LIMIT);
    } catch (error) {
      console.error("Lỗi khi tải thêm bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feedPosts.length > 0 && initialFetched) {
      const filtered = filterBlockedPosts(feedPosts);
      if (filtered.length !== feedPosts.length) {
        setFeedPosts(filtered);
      }
    }
  }, [blockedIdList, blockerIdList, initialFetched]);

  useEffect(() => {
    if (blockListLoading === false && feedPosts.length === 0 && !initialFetched) {
      fetchInitialPosts();
    }
    else if (blockListLoading === undefined && feedPosts.length === 0 && !initialFetched) {
      const timer = setTimeout(() => {
        fetchInitialPosts();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [blockListLoading, feedPosts.length, initialFetched]);

  useEffect(() => {
    return () => {
      setInitialFetched(false);
    };
  }, []);

  return { feedPosts, fetchMorePosts, loading, hasMore };
};

export default useGetFeedPosts;