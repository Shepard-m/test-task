import { Route, Routes } from 'react-router-dom'
import { AppRoute } from './const'
import React from 'react'
import MainPage from './pages/main-page'
import PostPage from './pages/post-page'
import CreatePostPage from './pages/create-post-page'
import NotFoundPage from './pages/not-found-pages/not-found-page'

export default function App() {
  return (
    <Routes>
      <Route path={AppRoute.MAIN}>
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path={`${AppRoute.POST}/:id`}
          element={<PostPage />}
        />
        <Route
          path={AppRoute.CREATE_POST}
          element={<CreatePostPage />}
        />
        <Route
          path={AppRoute.NOT_FOUND_PAGE}
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  )
}

