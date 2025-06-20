import { create } from "zustand";
const useIsToggleGoToPostFromCollectionStore = create((set) => ({
 isFromCollectionSmall: {isToggle: false, collectionId: null},
 setIsFromCollectionSmall: (boolean, collectionId) => set({isFromCollectionSmall: boolean, collectionId}),
}));
export default useIsToggleGoToPostFromCollectionStore;