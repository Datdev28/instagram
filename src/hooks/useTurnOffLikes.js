import { doc, updateDoc } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'
import { toast } from 'react-toastify';

const useTurnOffLikes = (post) => {
  const handleTurnOffLikes = async () => {
    try {
     const postRef = doc(fireStore, 'posts', post.id);
     const turnedOff = post.checkedHideLike;
    if(turnedOff){
      await updateDoc(postRef, {checkedHideLike: false});
    }else {
      await updateDoc(postRef, {checkedHideLike: true});
    } 
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    }
  }
  return handleTurnOffLikes
}

export default useTurnOffLikes
