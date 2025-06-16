import { useEffect, useState } from 'react'
import userProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

const useGetUserPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userProfile = userProfileStore(state => state.userProfile);
  const setPosts = usePostStore(state => state.setPosts);
  const posts = usePostStore(state => state.posts);
  useEffect(() => {
    setPosts([]);
    setIsLoading(false);
    const getPost = async() => {
     try {
      const q = query(collection(fireStore, 'posts'), where('createBy',"==", userProfile.uid));
      const querySnapShot = await getDocs(q);
      const posts = []
      querySnapShot.forEach((doc) => posts.push({...doc.data(), id: doc.id}));
      posts.sort((a, b) => b.createdAt - a.createdAt)
      setPosts(posts);
     } catch (error) {
      console.log(error);
     } finally {
      setIsLoading(true);
     }
    }
    getPost();
  }, [userProfile.posts, userProfile.uid, setPosts]);
  return {isLoading, posts}
}

export default useGetUserPost
