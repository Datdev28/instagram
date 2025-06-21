import { create } from "zustand";

const useCollectionPostStore = create((set, get) => ({
  collections: JSON.parse(localStorage.getItem("collections")) || [],

  setCollections: (collections) => {
    set({ collections });
    localStorage.setItem("collections", JSON.stringify(collections));
  },

  deleteCollection: (collectionId) => {
    const newCollections = get().collections.filter(
      (collection) => collection.id !== collectionId
    );
    set({ collections: newCollections });
    localStorage.setItem("collections", JSON.stringify(newCollections));
  },
  editNameCollection: (collectionId, newNameCollection) => {
    const newCollections = get().collections.map((collection) => {
      if(collection.id === collectionId){
        return {...collection, name: newNameCollection}
      }
      return collection;
    });
    set({collections: newCollections});
    localStorage.setItem('collections', JSON.stringify(newCollections));
  },
  unsavePostFromAllCollections: (postId) => {
    const newCollections = get().collections.map((collection) => ({
      ...collection,
      pickedPosts: collection.pickedPosts.filter((id) => id !== postId),
    }));
    set({ collections: newCollections });
    localStorage.setItem("collections", JSON.stringify(newCollections));
  },

  unsavePostFromCollection: (collectionId, postId) => {
    const newCollections = get().collections.map((collection) => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          pickedPosts: collection.pickedPosts.filter((id) => id !== postId),
        };
      }
      return collection;
    });
    set({ collections: newCollections });
    localStorage.setItem("collections", JSON.stringify(newCollections));
  },

  addPostInCollection: (collectionId, pickedPosts) => {
    const newCollections = get().collections.map((collection) => {
      if (collection.id === collectionId) {
        const newPickedPosts = [
          ...new Set([...pickedPosts, ...collection.pickedPosts]),
        ];
        return { ...collection, pickedPosts: newPickedPosts };
      }
      return collection;
    });
    set({ collections: newCollections });
    localStorage.setItem("collections", JSON.stringify(newCollections));
  },
}));

export default useCollectionPostStore;
