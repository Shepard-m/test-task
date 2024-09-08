import { createSlice } from "@reduxjs/toolkit";
import { fetchGetReview } from "../api-actions";
import { RequestStatus } from "../../const";
import { TReview } from "../../type/review";

type TInitialState = {
  statusPost: string;
  review: TReview[] | null;
}

const initialState: TInitialState = {
  statusPost: RequestStatus.NONE,
  review: null,
}

const reviewSlice = createSlice({
  extraReducers(builder) {
    builder
    .addCase(fetchGetReview.pending, (state) => {
      state.statusPost = RequestStatus.LOADING;
    })
    .addCase(fetchGetReview.fulfilled, (state, actions) => {
      state.statusPost = RequestStatus.SUCCESS;
      state.review = actions.payload;
    })
    .addCase(fetchGetReview.rejected, (state) => {
      state.statusPost = RequestStatus.FAILED;
    })
  },
  name: 'reviewSlice',
  reducers: {
    
  },
  initialState,
  selectors: {
    review: (state) => state.review,
  }
});

const actionsReview = reviewSlice.actions;
const selectorsReview = reviewSlice.selectors;

export { reviewSlice, selectorsReview, actionsReview }
