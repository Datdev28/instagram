import { useState } from "react";
import useAuthStore from "../store/authStore";
import { fireStore } from '../firebase/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const editProfile = async (inputs, imageURL) => {
		if (isUpdating || !authUser) return;
		const userDocRef = doc(fireStore, "users", authUser.uid);

		const q = query(collection(fireStore, "users"), where("userName", "==", inputs.userName));
		const querySnapShot = await getDocs(q);
		const duplicateUsers = querySnapShot.docs.filter(
			(doc) => doc.id !== authUser.uid
		);
		if (duplicateUsers.length > 0) {
			return true;
    }

		try {
			console.log(inputs.userName);
	   	setIsUpdating(true);
			const updatedUser = {
				...authUser,
				fullName: inputs.fullName || authUser.fullName,
				userName: inputs.userName || authUser.userName,
				bio: inputs.bio || authUser.bio,
				profilePicURL: imageURL || authUser.profilePicURL,
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			return false;
		} catch (error) {
      console.log(error)
		}finally {
			setIsUpdating(false);
		}
	};

	return { editProfile };
};

export default useEditProfile;