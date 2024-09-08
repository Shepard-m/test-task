import { configureStore } from "@reduxjs/toolkit";
import { createApi } from "../server/api";
import { reducer } from "./reduser";

const api = createApi();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }),
  reducer
})