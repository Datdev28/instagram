import { create } from "zustand";
const useIsToggleGoToPostFromCollectionStore = create((set) => ({
 isFromCollectionSmall: false,
 setIsFromCollectionSmall: (value) => set({isFromCollectionSmall: value}),
 idCollectionSmall: null,
 setIdCollectionSmaill: (id) => set({idCollectionSmall: id})
}));
export default useIsToggleGoToPostFromCollectionStore;