import useAuthStore from '../store/authStore'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import { toast } from 'react-toastify';
import useCollectionPostStore from '../store/collectionSaveStore';
import { useState } from 'react';

const useAddPostInCollection = (collectionId, pickedPosts) => {
  const [isAdding, setAdding] = useState(false) 
  const user = useAuthStore(state => state.user);
  const addPostInCollection = useCollectionPostStore(state => state.addPostInCollection)
  const handleAddPostInCollection = async() => {
    if(isAdding) return 
    setAdding(true)
    try {
      const collectionRef = doc(fireStore, 'users', user.uid, 'collections', collectionId);
      const docSnap = await getDoc(collectionRef);
      if(docSnap.exists()){
        await updateDoc(collectionRef, {pickedPosts: arrayUnion(...pickedPosts)});
        addPostInCollection(collectionId, pickedPosts);
      }
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setAdding
    }
  }
  return {handleAddPostInCollection, isAdding}
}

export default useAddPostInCollection
