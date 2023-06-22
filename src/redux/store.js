import { configureStore } from "@reduxjs/toolkit";
import api_slice from "./features/api/_API_slice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [api_slice.reducerPath]: api_slice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api_slice.middleware),
});
