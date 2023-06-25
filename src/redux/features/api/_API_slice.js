import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const API_BASE_URL = import.meta.env.DEV.VITE_BASE_API_URL ||import.meta.env.PROD.VITE_BASE_API_URL;

const api_slice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers, {getState , endpoint}) => {
      try {
          const token = getState()?.auth.loggedInUser?.token;
          console.log(token);
          
          if(token){     
            headers.set('Authorization' , `Bearer ${token}`)
         }
         return headers;
      } catch {}
    },
  }),
  endpoints: (builder) => ({}),
});

export default api_slice;
