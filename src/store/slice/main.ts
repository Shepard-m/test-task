import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPosts } from "../../type/posts";
import { fetchGetPosts, fetchPaginationPost } from "../api-actions";
import { countOfPostsPage, RequestStatus } from "../../const";

type TInitialState = {
  statusPost: string;
  posts: TPosts[];
  postsPage: TPosts[];
}

const initialState: TInitialState = {
  statusPost: RequestStatus.NONE,
  posts: [],
  postsPage: [],
}

const mainSlice = createSlice({
  extraReducers(builder) {
    builder
    .addCase(fetchGetPosts.pending, (state) => {
      state.statusPost = RequestStatus.LOADING;
    })
    .addCase(fetchGetPosts.fulfilled, (state, actions) => {
      state.statusPost = RequestStatus.SUCCESS;
      state.posts = actions.payload;
      state.postsPage = actions.payload.slice(0, countOfPostsPage);
    })
    .addCase(fetchGetPosts.rejected, (state) => {
      state.statusPost = RequestStatus.FAILED;
    })
    .addCase(fetchPaginationPost.pending, (state) => {
      state.statusPost = RequestStatus.LOADING;
    })
    .addCase(fetchPaginationPost.fulfilled, (state, actions) => {
      state.statusPost = RequestStatus.SUCCESS;
      state.postsPage = actions.payload;
    })
    .addCase(fetchPaginationPost.rejected, (state) => {
      state.statusPost = RequestStatus.FAILED;
    })
  },
  name: 'mainSlice',
  reducers: {
    
  },
  initialState,
  selectors: {
    posts: (state) => state.posts,
    postsPage: (state) => state.postsPage,
    statusPost: (state) => state.statusPost,
  }
});

const actionsMain = mainSlice.actions;
const selectorsMain = mainSlice.selectors;

export { mainSlice, selectorsMain, actionsMain }
