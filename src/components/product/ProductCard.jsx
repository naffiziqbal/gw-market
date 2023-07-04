import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCart } from "../../hooks/useCart";
import { addToCart, updateCart } from "../../redux/features/addToCart/cartSlice";
import { convertCartItemDataForAPI } from "../../utils/cart";
import { debounce } from "../../utils/utils";
import styles from "./ProductCard.module.scss";

function ProductCard({ productData = {} }) {
  const dispatch = useDispatch();
  const { isExist  , getData} = useCart();
  const [trackClick , setTrackClick] = useState(0)


  const addToCartHandler =  (product) => {
    dispatch(addToCart({ ...product }));
    setTrackClick((prev)=> ++prev)
  };

 // update cart api
 useEffect(() => {
  if (trackClick) {
    const data = convertCartItemDataForAPI(getData?.cartItems);

    const update = debounce(() => {
      dispatch(updateCart({ cart_items: data }));
    }, 400);

    update(); // Invoke the debounced update function immediately
   setTrackClick(0)
    // Return a cleanup function to cancel the debounce timer
    return () => {
      clearTimeout(update);
    };
  }
}, [trackClick]);




  return (
    <div className={`${styles.product_card} shadow-md `}>
      <img src={productData?.image} alt="" />
      {/* title  */}
      <h3 className={`${styles.title} my-4`}>{productData?.name}</h3>

      {/* price and button  */}
      <div
        className={`d-flex justify-content-between align-items-center w-100 ${styles.btn_wrapper}`}
      >
        <p>${productData?.price}</p>
        <button
          type="button"
          className={`${styles.btn}`}
          onClick={() => {
            addToCartHandler(productData);
          }}
          disabled={isExist(productData?.id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
