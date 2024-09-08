import React from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../const";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <ul className="header__navigate">
          <li className="header__navigate-item">
            <Link to={AppRoute.MAIN} className="header__navigate-link">Главная</Link>
          </li>
          <li className="header__navigate-item">
          <Link to={AppRoute.CREATE_POST} className="header__navigate-link">Создать пост</Link>
          </li>
        </ul>
      </div>
    </header>

  )
}