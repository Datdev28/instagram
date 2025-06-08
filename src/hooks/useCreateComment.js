import { useState } from 'react'
import useAuthStore from '../store/authStore';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import usePostStore from '../store/postStore';
import { v4 as uuidv4 } from 'uuid';
const useCreateComment = (postId, comment) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const user = useAuthStore(state => state.user);
  const addComment = usePostStore(state => state.addComment);
   const handleCreateComment = async() => {
    if(isCommenting) return 
    setIsCommenting(true)
    const newComment = {
      id: uuidv4(),
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
      addComment(newComment, postId);
     } catch (error) {
      console.log(error);
     } finally {
      setIsCommenting(false);
     }
   }
  return {handleCreateComment, isCommenting}
}

export default useCreateComment
