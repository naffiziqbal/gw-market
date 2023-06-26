import api_slice from "../api/_API_slice";

export const addressApi = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    getAddress: builder.query({
      query: () => `/account/address-construct`,
    }),
  }),
});

export const { useGetAddressQuery } = addressApi;
