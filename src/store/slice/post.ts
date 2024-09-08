import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPosts } from "../../type/posts";
import { fetchDeleteComment, fetchDeletePost, fetchGetPost, fetchPatchPost } from "../api-actions";
import { RequestStatus } from "../../const";

type TInitialState = {
  statusPost: string;
  post: TPosts | null;
}

const initialState: TInitialState = {
  statusPost: RequestStatus.NONE,
  post: null,
}

const postSlice = createSlice({
  extraReducers(builder) {
    builder
    .addCase(fetchGetPost.pending, (state) => {
      state.statusPost = RequestStatus.LOADING;
    })
    .addCase(fetchGetPost.fulfilled, (state, actions) => {
      state.statusPost = RequestStatus.SUCCESS;
      state.post = actions.payload;
    })
    .addCase(fetchGetPost.rejected, (state) => {
      state.statusPost = RequestStatus.FAILED;
    })
    .addCase(fetchDeletePost.pending, (state) => {
      state.statusPost = RequestStatus.LOADING;
    })
    .addCase(fetchDeletePost.fulfilled, (state) => {
      state.statusPost = RequestStatus.SUCCESS;
    })
    .addCase(fetchDeletePost.rejected, (state) => {
      state.statusPost = RequestStatus.FAILED;
    })
    .addCase(fetchDeleteComment.pending, (state) => {
      state.statusPost = RequestStatus.LOADING;
    })
    .addCase(fetchDeleteComment.fulfilled, (state) => {
      state.statusPost = RequestStatus.SUCCESS;
    })
    .addCase(fetchDeleteComment.rejected, (state) => {
      state.statusPost = RequestStatus.FAILED;
    })
    .addCase(fetchPatchPost.pending, (state) => {
      state.statusPost = RequestStatus.LOADING;
    })
    .addCase(fetchPatchPost.fulfilled, (state) => {
      state.statusPost = RequestStatus.SUCCESS;
    })
    .addCase(fetchPatchPost.rejected, (state) => {
      state.statusPost = RequestStatus.FAILED;
    })
  },
  name: 'postSlice',
  reducers: {
    
  },
  initialState,
  selectors: {
    post: (state) => state.post,
  }
});

const actionsPost = postSlice.actions;
const selectorsPost = postSlice.selectors;

export { postSlice, selectorsPost, actionsPost }
