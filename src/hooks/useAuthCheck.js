import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../redux/features/auth/authSlice";


export  const useAuthCheck = ()=>{
   const dispatch = useDispatch()
   const [isAuthorized, setIsAuthorized] = useState(false);
  
   useEffect(()=>{
    const cookie = Cookies.get("authUserData");

    if (cookie) {
        const data = JSON.parse(cookie);
        if (data instanceof Object && data?.access_token) {
          dispatch(loggedInUser({token: data?.access_token , user:data?.user}));
        }
      }
      setIsAuthorized(true);

   }, [])

   return isAuthorized;
}