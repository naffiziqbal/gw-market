import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosIns from "../utils/axiosIns";
import cartSlice from "./features/addToCart/cartSlice";
import api_slice from "./features/api/_API_slice";
import authSlice, { updateToken } from "./features/auth/authSlice";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

// refresh token
const refreshTokenFetch = async (loggedInUser, dispatch) => {
  try {
    const payload = {
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: loggedInUser?.refresh_token,
    };

    const res = await axiosIns.post("/auth/token", payload);
    if (res?.data && res?.data?.access_token) {
      const { access_token, expires_in } = res.data;

      Cookies.set(
        "authUserData",
        JSON.stringify({ ...res.data, user: loggedInUser?.user }),
        { expires: expires_in }
      );

      dispatch(updateToken({ token: access_token }));
    }
  } catch (err) {
    dispatch(updateToken({ haveToLogOut: true }));
  }
};

// Define your custom error handling middleware
const errorHandlingMiddleware = (store) => (next) => async (action) => {
  const { dispatch, getState } = store;
  const loggedInUser = getState()?.auth?.loggedInUser;
  try {
    if (action.payload?.status === 401) {
      // Handle the error globally, for example, dispatching a specific action or showing a notification
      await refreshTokenFetch(loggedInUser, dispatch);
    }
    return next(action);
  } catch (error) {
    // Handle the error globally, for example, dispatching a specific action or showing a notification
    throw error;
  }
};

export const store = configureStore({
  reducer: {
    [api_slice.reducerPath]: api_slice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api_slice.middleware,
      errorHandlingMiddleware
    ),
});

export default store;
