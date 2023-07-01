import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../redux/features/auth/authSlice";
import { checkToken } from "../utils/authUtils";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [Data, setData] = useState(false);


  useEffect(() => {
    const data = checkToken();
    if (data && data instanceof Object && data?.access_token) {
      dispatch(loggedInUser({ token: data?.access_token, user: data?.user }));
      setData(data)
    }

    setIsAuthorized(true);
  }, []);

  return {isAuthorized ,  Data};
};
