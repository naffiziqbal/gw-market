import React from "react";
import { useDispatch } from "react-redux";
import { useCart } from "../../hooks/useCart";
import { addToCart } from "../../redux/features/addToCart/cartSlice";
import styles from "./ProductCard.module.scss";

function ProductCard({ productData = {} }) {
  const dispatch = useDispatch();
  const {isExist} = useCart()

  

const addToCartHandler = (product)=>{
  dispatch(addToCart({ ...product }));

}



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
          onClick={()=>{addToCartHandler(productData)}}

          disabled = {isExist(productData?.id)}
         
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
