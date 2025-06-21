import React, { useState } from 'react'
import useAuthStore from '../store/authStore';
import { doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import { toast } from 'react-toastify';
import useCollectionPostStore from '../store/collectionSaveStore';

const useEditNameCollection = (collectionId) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useAuthStore(state => state.user);
  const editNameCollection = useCollectionPostStore(state => state.editNameCollection);
  const handeEditNameCollection = async(newNameCollection) => {
    if(isEditing) return;
    setIsEditing(true);
    try {
      const collectionRef = doc(fireStore, 'users', user.uid, 'collections', collectionId);
      await updateDoc(collectionRef, {name: newNameCollection});
      editNameCollection(collectionId, newNameCollection)
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsEditing(false);
    }
  }
  return {handeEditNameCollection, isEditing}
}

export default useEditNameCollection
