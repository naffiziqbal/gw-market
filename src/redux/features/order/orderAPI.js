import api_slice from "../api/_API_slice";



const orderAPI = api_slice.injectEndpoints(
    {
        endpoints: (builder)=>({
            placeOrder: builder.mutation({
                query: (data)=>({
                    url: '/customer/place-order/',
                    body: data
                }), 
            })
        })
    }
)



export const {usePlaceOrderMutation} = orderAPI;
