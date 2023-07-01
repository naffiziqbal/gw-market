import api_slice from "../api/_API_slice";

const cartAPI = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/customer/update-cart/",
        method: "post",
        body: data,
      }),
    }),

    // get cart data
    getCart: builder.query({
      query: () => "/customer/cart/",
    }),
  }),
});



export const {useGetCartQuery , useUpdateCartMutation} = cartAPI