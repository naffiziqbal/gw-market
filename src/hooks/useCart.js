import { useSelector } from "react-redux/es/hooks/useSelector";

export const useCart = () => {
  const cart = useSelector((state) => state?.cart);

  const getLength = () => {
    return cart?.cartItems?.length;
  };

  const isExist = (id) => {
    return cart?.cartItems?.some((value) => value?.item?.id === id);
  };

  const subTotalPrice = () => {
    return cart?.cartItems?.reduce((total, New) => {
      return total + New?.price;
    }, 0);
  };

  return { getLength, getData: cart, isExist, subTotalPrice };
};
