import { useState } from 'react'
import useAuthStore from '../store/authStore';
import { arrayUnion, doc, increment, updateDoc } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
const useCreateComment = (poster, postId, comment) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const user = useAuthStore(state => state.user);
   const handleCreateComment = async() => {
    if(isCommenting) return 
    setIsCommenting(true)
    const newComment = {
      id: uuidv4(),
      comment,
      createdAt: Date.now(),
      createBy: user?.uid,
      postId,
      poster: poster,
      replyComment: [],
      likesOfComment: [],
    }
     try {
      const postRef = doc(fireStore, 'posts', postId);
      await updateDoc(postRef, {comments: arrayUnion(newComment), commentCount: increment(1)});
     } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!")
     } finally {
      setIsCommenting(false);
     }
   }
  return {handleCreateComment, isCommenting}
}

export default useCreateComment
