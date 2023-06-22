import { useSelector } from "react-redux";

export const useUserData = () => {
  const user = useSelector((state) => state.auth?.loggedInUser)?.user;

  return user;
};
