import React, { useEffect } from "react";
import Container from "../components/container";
import { useAppDispatch, useAppSelectors } from "../type/indexStore";
import { selectorsMain } from "../store/slice/main";
import ListPosts from "../components/list-post";
import Pagination from "../components/pagination";
import { fetchGetPosts } from "../store/api-actions";
import Loader from "../components/loader/loader";
import { RequestStatus } from "../const";
import ErrorServer from "../components/error-server/error-server";

export default function MainPage() {
  const posts = useAppSelectors(selectorsMain.postsPage);
  const dispatch = useAppDispatch();
  const statusPosts = useAppSelectors(selectorsMain.statusPost);
  
  if (statusPosts === RequestStatus.FAILED) {
    return <ErrorServer />
  }
  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [])

  return (
    <>    
      {statusPosts === RequestStatus.LOADING &&
        <Loader />
      }
      <Container>
        <>
          <ListPosts posts={posts}/>
          <Pagination />
        </>   
      </Container>
    </>
  )
}