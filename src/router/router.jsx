import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Checkout from "../Pages/checkout/Checkout";
import Contact from "../Pages/contact/contact";
import ConfirmedOrder from "../Pages/order/confirmedOrder";
import PlaceOrder from "../Pages/order/placeOrder";
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
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        ),
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/place_order",
        element: (
          <ProtectRoute>
            <PlaceOrder />
          </ProtectRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <ProtectRoute>
            <Contact />
          </ProtectRoute>
        ),
      },
      {
        path: "/confirmed_order",
        element: (
          <ProtectRoute>
            <ConfirmedOrder />
          </ProtectRoute>
        ),
      },
    ],
  },
]);

export default router;
