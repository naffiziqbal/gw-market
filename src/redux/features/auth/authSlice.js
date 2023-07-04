import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogoutApi } from "./authAPI";

export const fetchLogout = createAsyncThunk("account/fetchLogout", async ( _ , {getState}) => {
  const token = getState().auth?.loggedInUser?.token;
  console.log(token);
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
    updateToken:(state , action)=>{
      const {token , haveToLogOut} = action.payload

      if(haveToLogOut){
         state.loggedInUser.haveToLogOut = true;
      }else{
        state.loggedInUser.token = token;
        state.loggedInUser.haveToLogOut = false;
      }
      
    },
    
    userLoggedOut: (state) => {
      state.loggedInUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogout.fulfilled, (state, action) => {
        console.log(action.payload);
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

export const { loggedInUser, userLoggedOut , updateToken} = authSlice.actions;
export default authSlice;
