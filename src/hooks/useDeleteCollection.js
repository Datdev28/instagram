import { deleteDoc, doc } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'
import useAuthStore from '../store/authStore'
import useCollectionPostStore from '../store/collectionSaveStore'
import { toast } from 'react-toastify'
import { useState } from 'react'

const useDeleteCollection = (collectionId) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useAuthStore(state => state.user);
  const deleteCollection = useCollectionPostStore(state => state.deleteCollection)
  const handleDelCollection = async() => {
    if(isDeleting) return
    try {
      setIsDeleting(true);
      const collectionRef = doc(fireStore, 'users', user.uid, 'collections', collectionId)
      await deleteDoc(collectionRef);
      deleteCollection(collectionId);
    } catch {
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    } finally {
      setIsDeleting(false);
    }

  }
  return {handleDelCollection, isDeleting}
}

export default useDeleteCollection
