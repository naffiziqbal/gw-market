import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


function ProtectRoute({ children }) {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to='/login'/>;
}

export default ProtectRoute;
