import { create } from "zustand";
const useCollectionPostStore = create((set) => ({
 collections: JSON.parse(localStorage.getItem("collections")) || [],
 setCollections: (collections) => set({collections}),
 unsavePostFromAllCollections:  (postId) => set((state) => ({
  collections: state.collections.map((collection) => ({
   ...collection,
   pickedPosts:  collection.pickedPosts.filter((id) => id !== postId)
  }))
 }))
}));
export default useCollectionPostStore;