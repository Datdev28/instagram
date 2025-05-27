import { create } from "zustand";
const usePostStore = create((set) => ({
  posts: [], 
  createPost: (post) => set((state) => ({
    posts: [...state.posts, post]
  })),
  setPosts: (posts) => set({posts})
}));
export default usePostStore