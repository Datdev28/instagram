import { create } from "zustand";

const usePostStore = create((set) => ({
  // === Profile posts ===
  posts: [],
  setPosts: (posts) => set({ posts }),
  createPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => id !== post.id),
    })),

  // === Feed posts ===
  feedPosts: [],
  setFeedPosts: (posts) => set({ feedPosts: posts }),
  deleteFeedPost: (id) =>
    set((state) => ({
      feedPosts: state.feedPosts.filter((post) => id !== post.id),
    })),
}));

export default usePostStore;
