import React, { useEffect } from "react";
import Header from "./header";
import { RequestStatus, scrollLock } from "../const";
import { fetchGetPosts } from "../store/api-actions";
import { selectorsMain } from "../store/slice/main";
import { useAppSelectors, useAppDispatch } from "../type/indexStore";
import ErrorServer from "./error-server/error-server";
import Loader from "./loader/loader";

type TContainer = {
  children: JSX.Element;
}

export default function Container({ children }: TContainer) {

  const statusPost = useAppSelectors(selectorsMain.statusPost);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [])

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.classList.remove(scrollLock);
  }, []);


  if (statusPost === RequestStatus.LOADING) {
    return <Loader />
  }

  if (statusPost === RequestStatus.FAILED) {
    return <ErrorServer />
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          {children}
        </div>
      </main>
    </>
  )
}