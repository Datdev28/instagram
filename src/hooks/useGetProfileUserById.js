import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { fireStore } from '../firebase/firebase';

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
     } catch (error) {
       console.log(error);
     } 
   }
   getProfileUserById();
  }, [userId, setUserProfile]);
  return {userProfile}
}

export default useGetProfileUserById
