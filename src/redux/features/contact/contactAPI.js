import api_slice from "../api/_API_slice";

const contactAPI = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    initialAddContact: builder.mutation({
      query: (data) => ({
        url: "/customer/initialize-main-contact/",
        method: "POST",
        body: data,
      }),
    }),
    // add contact
    addContact: builder.mutation({
      query: (data) => ({
        url: "/customer/add-contact/",
        method: "POST",
        body: data,
      }),
    }),
    //    get contact

    getContact: builder.query({
      query: () => "/customer/contacts/",
    }),
  }),
});

export const { useInitialAddContactMutation , useGetContactQuery , useAddContactMutation } = contactAPI;
