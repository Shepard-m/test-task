import React from "react";
import { TPosts } from "../type/posts";
import PostItem from "./post-item";

type TListPosts = {
  posts: TPosts[];
}

export default function ListPosts( {posts}: TListPosts ) {
  return (
    <ul className="list-products">
      {posts.map((post) => <PostItem key={post.id} post={post}/>)}
    </ul>
  )
}