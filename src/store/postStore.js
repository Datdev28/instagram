import { create } from "zustand";

const usePostStore = create((set) => ({
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

  feedPosts: [],
  setFeedPosts: (posts) => set({ feedPosts: posts }),
  appendFeedPosts: (newPosts) =>
    set((state) => ({
      feedPosts: [...state.feedPosts, ...newPosts],
    })),
  deleteFeedPost: (id) =>
    set((state) => ({
      feedPosts: state.feedPosts.filter((post) => id !== post.id),
    })),

  randomPosts: [],
  setRandomPosts: (posts) => set({ randomPosts: posts }),
  appendRandomPosts: (newPosts) =>
    set((state) => ({
      randomPosts: [...state.randomPosts, ...newPosts],
    })),
  deleteRandomPost: (id) =>
    set((state) => ({
      randomPosts: state.randomPosts.filter((post) => id !== post.id),
    })),
}));

export default usePostStore;