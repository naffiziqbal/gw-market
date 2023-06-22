import { configureStore,  } from "@reduxjs/toolkit";
import api_slice from "./features/api/_API_slice";

export const store = configureStore({
    reducer:{
       [api_slice.reducerPath] : api_slice.reducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware()
})