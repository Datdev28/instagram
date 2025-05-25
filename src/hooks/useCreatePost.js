import React, { useState } from 'react'
import useAuthStore from '../store/authStore'
import userProfileStore from '../store/userProfileStore';
import usePostStore from '../store/postStore';
const useCreatePost = () => {
  const user = useAuthStore((state) => state.user);
  const userProfile = userProfileStore((state) => state.userProfile);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = userProfileStore((state) => state.addPost);
  const handleCreatePost = async(imageUrls, caption, checkedHideLike, turnOfComment) => {
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      checkedHideLike: checkedHideLike,
      turnOfComment: turnOfComment,
      
      
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default useCreatePost
