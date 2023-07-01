import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogoutApi } from "./authAPI";

export const fetchLogout = createAsyncThunk("account/fetchLogout", async (token) => {
  
  const res =  await fetchLogoutApi(token);
  return res.data;
});




const initialState = {
  loggedInUser: {},
  logout:{},
  isLoading: false,
  error: {},
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logout = action.payload;
      })
      .addCase(fetchLogout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error.msg = action.error?.message;
        state.isLoading= false
      });
  },
});

export const { loggedInUser, userLoggedOut } = authSlice.actions;
export default authSlice;
