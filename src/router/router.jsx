import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Main from "../layout/Main";
import ProtectRoute from "./ProtectRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
            <Home/>

        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login/>
          </PublicRoute>
        ),
      },
      {
        path: '/dashboard',
        element:(
            <ProtectRoute>
                <Dashboard/>
            </ProtectRoute>
        )
      }
    ],
  },
]);

export default router;
