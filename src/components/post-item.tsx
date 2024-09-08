import React from "react";
import { TPosts } from "../type/posts";
import { Link } from "react-router-dom";
import { AppRoute } from "../const";

type TPostItem = {
  post: TPosts;
}

export default function PostItem( {post}: TPostItem ) {
  return (
    <Link to={`${AppRoute.POST}/${post.id}`}>    
      <li className="list-products__item">
        <h2 className="list-products__title">
          {post.title}
        </h2>
        <span className="list-products__views">Кол-во просмотров: {post.views}</span>
      </li>
    </Link>
  )
}