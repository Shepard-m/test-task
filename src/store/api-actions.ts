import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { TPosts } from "../type/posts";
import { ApiRoute, countOfPostsPage } from "../const";
import { TReview } from "../type/review";

export const fetchGetPosts = createAsyncThunk<TPosts[], undefined, {extra: AxiosInstance}>(
  'data/fetchGetArticle',
  async (_arg, {extra: api}) => {
    const { data } = await api.get(ApiRoute.ARTICLE);

    return data
  }
);

export const fetchGetPost = createAsyncThunk<TPosts, string, {extra: AxiosInstance}>(
  'data/fetchGetPost',
  async (id, {extra: api}) => {
    const { data } = await api.get(`${ApiRoute.ARTICLE}/${id}`);

    return data
  }
);

export const fetchGetReview = createAsyncThunk<TReview[], string, {extra: AxiosInstance}>(
  'data/fetchGetReview',
  async (id, {extra: api}) => {
    const { data } = await api.get(`${ApiRoute.COMMENTS}?postId=${id}`);

    return data
  }
);

export const fetchPostNewPost = createAsyncThunk<void, TPosts, {extra: AxiosInstance}>(
  'data/fetchPostNewPost',
  async (post, {extra: api}) => {
    await api.post(`${ApiRoute.ARTICLE}`, post);
  }
);
export const fetchDeletePost = createAsyncThunk<void, string, {extra: AxiosInstance}>(
  'data/fetchDeletePost',
  async (id, {extra: api}) => {
    await api.delete(`${ApiRoute.ARTICLE}/${id}`);
  }
);
export const fetchDeleteComment = createAsyncThunk<void, string, {extra: AxiosInstance}>(
  'data/fetchDeleteComment',
  async (id, {extra: api}) => {
    await api.delete(`${ApiRoute.COMMENTS}/${id}`);
  }
);

export const fetchPatchPost = createAsyncThunk<void, TPosts, {extra: AxiosInstance}>(
  'data/fetchPatchPost',
  async (update, {extra: api}) => {
    await api.patch(`${ApiRoute.ARTICLE}/${update.id}`, update);
  }
);
export const fetchPaginationPost = createAsyncThunk<TPosts[], string, {extra: AxiosInstance}>(
  'data/fetchPaginationPost',
  async (page, {extra: api}) => {
    const { data } = await api.get(`${ApiRoute.ARTICLE}?_page=${page}&_per_page=${countOfPostsPage}`);
    return data.data;
  }
);