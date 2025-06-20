import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { fireStore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';
import useCollectionPostStore from '../store/collectionSaveStore';
import { useState } from 'react';
const useCreateCollection = (nameCollectionInput, pickPosts) => {
  const [isLoading, setIsLoading] = useState(false)
  const user = useAuthStore(state => state.user);
  const collections = useCollectionPostStore(state => state.collections);
  const setCollections =  useCollectionPostStore(state => state.setCollections);
  const handleCreateCollection = async() => {
    try {
      if(isLoading) return;
      setIsLoading(true);
      const newId = uuidv4()
      const collectionRef = doc(fireStore, 'users', user.uid, 'collections', newId);
      const collection = {
        id: newId,
        pickedPosts: pickPosts,
        name: nameCollectionInput
      }
      await setDoc(collectionRef, collection);
      setCollections([...collections, collection]);
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!")
    } finally {
      setIsLoading(false);
    }
  }
  return {handleCreateCollection, isLoading}
}

export default useCreateCollection
