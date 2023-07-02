import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useUpdateCartMutation } from "../../redux/features/addToCart/cartAPI";
import { removeAll, removeItem } from "../../redux/features/addToCart/cartSlice";
import BackButton from "../ui/BackButton";
import PageLoading from '../ui/PageLoading';
import CheckoutItem from "./CheckoutItem";
import styles from "./CheckoutList.module.scss";



function CheckoutList({ data = [], subTotal, shippingPrice }) {
  const dispatch = useDispatch();
  const [updateCart, { isLoading, isError }] = useUpdateCartMutation();
  const [trackClick , setTrackClick] = useState(0)
 const isAuth = useAuth()

  // remove all item from the list 
  const removeAllInCartItem = async () => {
    try {
      isAuth && await updateCart({ cart_items: [] });
      dispatch(removeAll());
    } catch (err) {
      console.log(err);
    }
  };

// item remove handler to remove a single item

  const removeHandler = (id) => {
    dispatch(removeItem({ id: id }));
    setTrackClick(1)
  };



if(isLoading) return <div> <PageLoading/> </div>



    return (
      <div className={`${styles.CheckoutList}`}>
        <div className="d-flex justify-content-between align-items-center ">
          <div className="d-flex gap-2 align-items-center d-lg-block">
            <BackButton />
            <h2 className={`${styles.heading}`}>Continue Shopping</h2>
          </div>
          <button
            type="button"
            className={styles.remove_all_btn}
            onClick={removeAllInCartItem}
          >
            Remove All
          </button>
        </div>
        <ul className={`list-unstyled`}>
          {data.cartItems.map((value) => (
            <li key={value?.item?.id}>
              <CheckoutItem product={value} removeHandler={removeHandler} resetTrackClick={setTrackClick} trackClick={trackClick}   />
            </li>
          ))}
        </ul>
        <div className={`${styles.pricing_wrapper}`}>
          <p className={`${styles.pricing}`}>
            <span>Subtotal</span>
            <span>${subTotal}</span>
          </p>
          <p className={`${styles.pricing}`}>
            <span>Shipping</span>
            <span>${shippingPrice}</span>
          </p>
          <div className={`${styles.divider}`}></div>
          <p className={`${styles.pricing}`}>
            <span>Total</span>
            <span>${subTotal + shippingPrice}</span>
          </p>
        </div>
      </div>
    );
  }



export default CheckoutList;
