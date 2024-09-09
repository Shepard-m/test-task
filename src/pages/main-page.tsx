import React from "react";
import Container from "../components/container";
import { useAppSelectors } from "../type/indexStore";
import { selectorsMain } from "../store/slice/main";
import ListPosts from "../components/list-post";
import Pagination from "../components/pagination";

export default function MainPage() {
  const posts = useAppSelectors(selectorsMain.postsPage);

  return (
    <Container>
      <>
        <ListPosts posts={posts}/>
        <Pagination />
      </>   
    </Container>
  )
}