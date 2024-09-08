import React, { useEffect } from "react";
import Container from "../components/container";
import { fetchGetPosts } from "../store/api-actions";
import { useAppDispatch, useAppSelectors } from "../type/indexStore";
import { selectorsMain } from "../store/slice/main";
import ListPosts from "../components/list-post";
import Pagination from "../components/pagination";

export default function MainPage() {
  const posts = useAppSelectors(selectorsMain.postsPage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [])

  return (
    <Container>
      <>
        <ListPosts posts={posts}/>
        <Pagination />
      </>   
    </Container>
  )
}