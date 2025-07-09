import React, { useState, useEffect } from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./postFooter";
import { useInView } from "react-intersection-observer";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import SlideImage from "../slideImage/SlideImage";

const Posts = () => {
  const { feedPosts, fetchMorePosts, loading, hasMore } = useGetFeedPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchMorePosts();
    }
  }, [inView, hasMore, loading]); 

  return (
    <div className="flex flex-col w-full max-w-lg gap-y-3 text-white">
      {feedPosts.map((item, idx) => (
        <React.Fragment key={item.id || idx}>
          <PostHeader poster={item} createdAt={item} />
          <SlideImage selectedFile={item.imageOfPost} fromModalShow={true} />
          <PostFooter post={item} />
          <hr className="border-1 border-color-dash my-8" />
        </React.Fragment>
      ))}

      <div ref={ref} className="h-10 flex justify-center items-center">
        {loading && (
          <img
            className="object-cover w-12 h-12 rounded-full"
            src="/loading.gif"
            alt="gif"
          />
        )}
      </div>

      {!hasMore && !loading && (
        <div className="text-center text-xl font-bold py-4">
          Bạn đã xem hết tin
        </div>
      )}
    </div>
  );
};

export default Posts;
