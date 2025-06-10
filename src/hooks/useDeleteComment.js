import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import { useState } from 'react';

const useDeleteComment = (postId, comment) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteComment = async () => {
    console.log(1);
    if(isDeleting) return
    setIsDeleting(true);
    try {
      const postRef = doc(fireStore, 'posts', postId);
      await updateDoc(postRef, {comments: arrayRemove(comment)})
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }
  return handleDeleteComment
}

export default useDeleteComment
