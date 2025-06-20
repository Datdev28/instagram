import { create } from "zustand";
const useCollectionPostStore = create((set) => ({
 collections: JSON.parse(localStorage.getItem("collections")) || [],
 setCollections: (collections) => set({collections}),
 deleteCollection: (collectionId) => set((state) => ({
 collections: state.collections.filter((collection) => collection.id !== collectionId)
 })),
 unsavePostFromAllCollections:  (postId) => set((state) => ({
  collections: state.collections.map((collection) => ({
   ...collection,
   pickedPosts:  collection.pickedPosts.filter((id) => id !== postId)
  }))
 })),
 unsavePostFromCollection: (collectionId, postId) => set((state) => ({
  collections: state.collections.map((collection) => {
    if(collection.id === collectionId){
      return {...collection, pickedPosts: collection.pickedPosts.filter((id) => id !== postId)}
    }
    return collection;
  })
 }))
}));
export default useCollectionPostStore;