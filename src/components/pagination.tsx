import React, { SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelectors } from "../type/indexStore";
import { selectorsMain } from "../store/slice/main";
import { countOfPostsPage } from "../const";
import { fetchPaginationPost } from "../store/api-actions";


export default function Pagination() {
  const posts = useAppSelectors(selectorsMain.posts);
  const [countPage, setCountPage] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const maxPage = Math.ceil(posts.length / countOfPostsPage) ;
    const newCountPage: number[] = [];
    for (let i = 1; i <= maxPage; i++) {
      newCountPage.push(i);
      setCountPage(newCountPage);
    }
  },[posts])

  function onSelectPageClick(evt: SyntheticEvent<HTMLLIElement>) {
    const id = evt.currentTarget.dataset.id;
    if (id) {
      dispatch(fetchPaginationPost(id));
    }
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {countPage.map((e) =>          
          <li className="pagination__item" key={e} data-id={e} onClick={onSelectPageClick}>
            <button className="pagination__button">{e}</button>
          </li>
        )}
      </ul>
    </div>

  );
}
