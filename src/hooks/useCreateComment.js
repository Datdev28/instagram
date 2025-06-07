import { useState } from 'react'
import useAuthStore from '../store/authStore';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

const useCreateComment = (postId, comment) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const user = useAuthStore(state => state.user);
  const addComment = usePostStore(state => state.addComment);
   const handleCreateComment = async() => {
    console.log(1);
    console.log(isCommenting);
    if(isCommenting) return 
    setIsCommenting(true)
    const newComment = {
      comment,
      createdAt: Date.now(),
      createBy: user.uid,
      postId,
      replyComment: [],
      likesOfComment: [],
    }
     try {
      const postRef = doc(fireStore, 'posts', postId);
      await updateDoc(postRef, {comments: arrayUnion(newComment)});
      addComment(comment, postId);
     } catch (error) {
      console.log(error);
     } finally {
      setIsCommenting(false);
     }
   }
  return {handleCreateComment, isCommenting}
}

export default useCreateComment
