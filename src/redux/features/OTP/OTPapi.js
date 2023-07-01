import api_slice from "../api/_API_slice";


const OTPapi = api_slice.injectEndpoints({
    endpoints:(builder)=>({
         sendOTP: builder.mutation({
            query: (data)=>({
                url:'/customer/send-otp/',
                method: 'POST', 
                body: data,
                
            })
         }),

        verifyOTP: builder.mutation({
            query: (data)=>({
                url:'/customer/verify-otp/',
                method: 'POST', 
                body: data
            })
         })
    })
})


export const {useSendOTPMutation , useVerifyOTPMutation} = OTPapi;