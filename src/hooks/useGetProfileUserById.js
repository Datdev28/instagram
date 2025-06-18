import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { fireStore } from '../firebase/firebase';
import { toast } from 'react-toastify';

const useGetProfileUserById = (userId) => {
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
   const getProfileUserById = async() => {
     try {
       const userRef = doc(fireStore, 'users', userId);
       const document =  await getDoc(userRef)
       if(document.exists()){
        setUserProfile(document.data());
       }
     } catch {
       toast.error("Đã xảy ra lỗi. Hãy thử lại!");
     } 
   }
   getProfileUserById();
  }, [userId, setUserProfile]);
  return {userProfile}
}

export default useGetProfileUserById
