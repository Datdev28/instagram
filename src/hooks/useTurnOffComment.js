import { doc, updateDoc } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'

const useTurnOffComment = (post) => {
  const handleTurnOffComment = async () => {
    try {
     const postRef = doc(fireStore, 'posts', post.id);
     const turnedOff = post.turnOfComment;
    if(turnedOff){
      await updateDoc(postRef, {turnOfComment: false});
    }else {
      await updateDoc(postRef, {turnOfComment: true});
    } 
    } catch (error) {
      console.log(error);
    }
  }
  return handleTurnOffComment
}

export default useTurnOffComment
