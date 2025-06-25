import { create } from "zustand";
const useMostPostLikeStore = create((set) => ({
  mostPostLike: null,
  setMostPostLike: (post) => set({mostPostLike: post}),
}))
export default useMostPostLikeStore