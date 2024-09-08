import { TPosts } from "./type/posts";

export function findMaxPostId(posts: TPosts[]) {
  let id = 0;
  for (const element of posts) {
    if (+element.id > id) {
      id = +element.id;
    }
  }
  return id;
}