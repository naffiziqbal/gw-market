import api_slice from "../api/_API_slice"

const productAPI = api_slice.injectEndpoints({
    endpoints:(builder)=>({
        getProduct: builder.query(
            {
                query: ()=> '/market/data/'
            }
        )
    })
})


export const {useGetProductQuery} = productAPI