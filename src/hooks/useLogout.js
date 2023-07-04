import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout, userLoggedOut } from "../redux/features/auth/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  async function logout() {
    try {
      const res = await dispatch(fetchLogout())
      if (res?.payload?.message) {
        dispatch(userLoggedOut({}));
        Cookies.remove("authUserData");
        return { msg: auth?.logout?.message };
      }
    } catch (err) {
      console.log(err);
    }
  }

  return {
    logout,
    isLoading: auth?.isLoading,
    error: auth?.error?.msg,
    success: auth?.logout?.message,
  };
};
