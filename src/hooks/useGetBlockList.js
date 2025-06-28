import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { fireStore } from '../firebase/firebase'
import { toast } from 'react-toastify'
import useBlockListStore from '../store/blockListStore'

const useGetBlockList = (userId) => {
  const {setBlockerIdList, setBlockedIdList} = useBlockListStore();
  const fetchBlockList = async() => {
    try {
     const blockerIdListRef = query(collection(fireStore, 'blocks'), where('blockerUserId', '==', userId));
     const blockedIdListRef = query(collection(fireStore, 'blocks'), where('blockedUserId', '==', userId));
     const blockerQuerySnapshot = await getDocs(blockerIdListRef);
     const blockedQuerySnapshot = await getDocs(blockedIdListRef);
     console.log(1);
     const newBlockerIdList = []; 
     const newBlockedIdList = [];
     if(!blockerQuerySnapshot.empty){
       blockerQuerySnapshot.docs.forEach((doc) => {
        newBlockerIdList.push({...doc.data(), id: doc.id});
       })
     }
     if(!blockedQuerySnapshot.empty){
        blockedQuerySnapshot.docs.forEach((doc) => {
        newBlockedIdList.push({...doc.data(), id: doc.id});
       })
     }
     setBlockerIdList(newBlockerIdList);
     setBlockedIdList(newBlockedIdList);
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
    }
  }
  useEffect(() => {
   if(userId) fetchBlockList()
  }, [userId])
}

export default useGetBlockList
