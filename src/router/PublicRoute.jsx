import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


function PublicRoute({children}) {
    const isAuth = useAuth();

  return !isAuth ? children : <Navigate to={'/'}/> 
}

export default PublicRoute