import { create } from "zustand";
const useCollectionPostStore = create((set) => ({
 collections: [],
 setCollections: (collections) => set({collections})
}));
export default useCollectionPostStore;