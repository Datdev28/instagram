import { create } from "zustand";
const usePostStore = create((set) => ({
  posts: [], 
  createPost: (post) => set((state) => ({
    posts: [...state.posts, post]
  })),
  addComment: (comment, postId) => set((state) => (
    state.posts.map((item) => {
      if(item.id === postId){
        return {...item, comments: [...item.comments, comment]}
      }
      return item
    })
  )),
  deletePost: (id) => set((state) => ({posts: state.posts.filter((post) => id !== post.id) })),
  setPosts: (posts) => set({posts})
}));
export default usePostStore;