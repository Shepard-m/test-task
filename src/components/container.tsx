import React, { useEffect } from "react";
import Header from "./header";
import  { RequestStatus, scrollLock } from "../const";
import ErrorServer from "./error-server/error-server";
import { selectorsMain } from "../store/slice/main";
import { useAppSelectors } from "../type/indexStore";
import { selectorsPost } from "../store/slice/post";

type TContainer = {
  children: JSX.Element;
}

export default function Container({ children }: TContainer) {
  const statusPosts = useAppSelectors(selectorsMain.statusPost);
  const statusPost = useAppSelectors(selectorsPost.statusPost);
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.classList.remove(scrollLock);
  }, []);

  if (statusPosts === RequestStatus.FAILED || statusPost === RequestStatus.FAILED) {
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