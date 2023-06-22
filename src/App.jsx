import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { useAuthCheck } from './hooks/useAuthCheck';
import router from './router/router';


function App() {
    const isAuthorized = useAuthCheck()

if(!isAuthorized) return <div>Authorizing.....</div>

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
