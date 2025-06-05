import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { fireStore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import userProfileStore from '../store/userProfileStore';
import usePostStore from '../store/postStore';

const useDeletePost = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useAuthStore(state => state.user);
  const deletePostInUserProfile = userProfileStore(state => state.deletePost);
  const deletePostInPosts = usePostStore(state => state.deletePost);
  const handleDeletePost = async(postId) => {
    try {
      setIsDeleting(true)
      const postRef = doc(fireStore, 'posts', postId);
      const userRef = doc(fireStore, 'users', user.uid);
      await deleteDoc(postRef);
      await updateDoc(userRef, {posts: arrayRemove(postId)});
      deletePostInUserProfile(postId);
      deletePostInPosts(postId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }
  return {handleDeletePost, isDeleting}
}

export default useDeletePost
