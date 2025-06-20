import { create } from "zustand";
const useCollectionPostStore = create((set) => ({
 collections: JSON.parse(localStorage.getItem("collections")) || [],
 setCollections: (collections) => set({collections})
}));
export default useCollectionPostStore;