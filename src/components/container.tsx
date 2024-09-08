import React, { useEffect } from "react";
import Header from "./header";
import { scrollLock } from "../const";

type TContainer = {
  children: JSX.Element;
}

export default function Container({ children }: TContainer) {

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.classList.remove(scrollLock);
  }, []);

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