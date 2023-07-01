import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { useGetCartQuery } from "./redux/features/addToCart/cartAPI";
import router from "./router/router";


function App() {
  const { isAuthorized } = useAuthCheck();


  if (!isAuthorized) return <div>authentication checking.....</div>;
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
