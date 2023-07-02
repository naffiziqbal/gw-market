import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useMatches } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import PageLoading from "../components/ui/PageLoading";
import useAddToCartFromLocal from "../hooks/useAddToCartFromLocal";
import { useAuth } from "../hooks/useAuth";
import { useGetCartQuery } from "../redux/features/addToCart/cartAPI";
import { initialData } from "../redux/features/addToCart/cartSlice";

const Main = () => {
  const matches = useMatches();
  const { data, isLoading, refetch } = useGetCartQuery();
  const dispatch = useDispatch();
  const {
    isLoading: isUpdateLoading,
    updateCart,
    localData,
  } = useAddToCartFromLocal();
  const isAuth = useAuth();

  useEffect(() => {
    if (data && isAuth) {
      dispatch(initialData({ data: data?.cart_items || [] }));
    }
  }, [isAuth]);

  /* ------------------------------- update cart ------------------------------ */
  useEffect(() => {
    if (isAuth) {
      (async () => {
        updateCart();
        const result = await refetch();
        if (result.data) {
          dispatch(initialData({ data: result.data?.cart_items || [] }));
        }
      })();
    }
  }, [isAuth]);

  // update cart  when unAuth

  useEffect(() => {
    if (!isAuth) {
      dispatch(initialData({ data: localData?.cart_items || [] }));
    }
  }, [isAuth]);

  
  let pathname = matches.some((value) => value.pathname === "/login");

  if (isLoading || isUpdateLoading)
    return (
      <div>
        <PageLoading />
      </div>
    );

  return (
    <>
      {!pathname ? <Navbar /> : null}
      <Outlet></Outlet>
    </>
  );
};

export default Main;
