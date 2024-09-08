import { combineReducers } from "@reduxjs/toolkit";
import { mainSlice } from "./slice/main";
import { postSlice } from "./slice/post";
import { reviewSlice } from "./slice/review";

export const reducer = combineReducers({
  [mainSlice.name]: mainSlice.reducer,
  [postSlice.name]: postSlice.reducer,
  [reviewSlice.name]: reviewSlice.reducer,
}
)