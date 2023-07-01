import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useMatches } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import PageLoading from "../components/ui/PageLoading";
import { useGetCartQuery } from "../redux/features/addToCart/cartAPI";
import { initialData } from '../redux/features/addToCart/cartSlice';


const Main = () => {
  const matches = useMatches();
  const { data , isLoading} = useGetCartQuery();
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (data) {
      dispatch(initialData({data:data?.cart_items }))
    }
  }, [data]);
  


  let pathname = matches.some((value) => value.pathname === "/login");





if(isLoading) return <div><PageLoading/></div>

  return (
    <>
      {!pathname ? <Navbar /> : null}
      <Outlet></Outlet>
    </>
  );
};

export default Main;
