import { create } from "zustand";
const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
  addComment: (comment, postId) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      }),
    })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => id !== post.id) })),
  setPosts: (posts) => set({ posts }),
  updateCommentLike: (postId, commentId, userId) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              const liked = comment.likesOfComment.includes(userId);
              return {
                ...comment,
                likesOfComment: liked
                  ? comment.likesOfComment.filter((id) => id !== userId)
                  : [...comment.likesOfComment, userId],
              };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      });

      return { posts: updatedPosts };
    }),
}));
export default usePostStore;
