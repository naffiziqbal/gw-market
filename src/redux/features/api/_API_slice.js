import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const api_slice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,

    }),
    endpoints: (builder)=>({})
})


export default api_slice;