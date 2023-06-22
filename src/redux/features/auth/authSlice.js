import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    userLoggedOut: (state) => {
      state.loggedInUser = {};
    },
  },
});

export const { loggedInUser, userLoggedOut } = authSlice.actions;
export default authSlice;
