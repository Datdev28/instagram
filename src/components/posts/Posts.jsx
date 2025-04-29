import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./postFooter";
const Posts = () => {
  const postUser = [
    {
      name: "messi10",
      post: "image1.jpg",
      numberOfLikes: "1022",
    },
    {
      name: "ronaldo",
      post: "image2.jpg",
      numberOfLikes: "1000",
    },
    {
      name: "mbape",
      post: "image3.jpg",
      numberOfLikes: "2219",
    },
    {
      name: "lukamodric",
      post: "image4.jpg",
      numberOfLikes: "3000",
    },
    {
      name: "neymar10",
      post: "image5.jpg",
      numberOfLikes: "2000",
    },
    {
      name: "dav.beckham",
      post: "image6.jpg",
      numberOfLikes: "5000",
    },
    {
      name: "linus",
      post: "image7.jpg",
      numberOfLikes: "420",
    },
    {
      name: "snoopdog",
      post: "image8.jpg",
      numberOfLikes: "140",
    },
    {
      name: "rooney9",
      post: "image9.jpg",
      numberOfLikes: "500",
    },
  ];
  return (
    <div className="flex flex-col w-full max-w-lg gap-y-3 text-white">
      {postUser.map((item) => (
        <>
          <PostHeader name={item.name}/>
          <div className="w-full h-0 pb-[120%] relative overflow-hidden">
            <img
              className="absolute inset-0 object-cover w-full h-full rounded-sm"
              src={item.post}
              alt="hình ảnh"
            />
          </div>
          <PostFooter numberOfLikes={item.numberOfLikes}/>
        </>
      ))}
    </div>
  );
};

export default Posts;
