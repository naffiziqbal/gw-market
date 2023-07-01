import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCart } from "../../hooks/useCart";
import {
  decrement,
  increment,
  updateCart
} from "../../redux/features/addToCart/cartSlice";
import { convertCartItemDataForAPI } from "../../utils/cart";
import { debounce } from "../../utils/utils";
import Counter from "../ui/cart/Counter";
import styles from "./CheckoutItem.module.scss";

function CheckoutItem({ product  , removeHandler , trackClick , resetTrackClick}) {
  const { quantity, price, item } = product;
  const dispatch = useDispatch();
  const { getData } = useCart();
  const [batchUpdateData, setBatchUpdateData] = useState([]);


  const incrementHandler = (id) => {
    dispatch(increment({ id }));
    addToBatchUpdate({ id, quantity: 1 });
  };

  const decrementHandler = (id) => {
    dispatch(decrement({ id }));
    addToBatchUpdate({ id, quantity: -1 });
  };




  const addToBatchUpdate = (data) => {
    const existingItemIndex = batchUpdateData.findIndex(
      (item) => item.id === data.id
    );
    if (existingItemIndex !== -1) {
      // Update the quantity if the item is already in the batch update
      batchUpdateData[existingItemIndex].quantity += data.quantity;
    } else {
      // Add the new item to the batch update
      setBatchUpdateData((prevData) => [...prevData, data]);
    }
  };

  // update cart api
  useEffect(() => {
    if (batchUpdateData.length > 0 || trackClick) {
      const data = convertCartItemDataForAPI(getData?.cartItems);

      const update = debounce(() => {
        dispatch(updateCart({ cart_items: data }));
        setBatchUpdateData([]); // Clear the batch update data after sending the request
        resetTrackClick(0)
      }, 600);

      update(); // Invoke the debounced update function immediately

      // Return a cleanup function to cancel the debounce timer
      return () => {
        clearTimeout(update);
      };
    }
  }, [batchUpdateData , trackClick]);



  return (
    <div className={` ${styles.checkoutItem}  `}>
      {/* left side  */}
      <div className="d-flex gap-sm-3 gap-2">
        {/* image  */}
        <figure>
          <img src={item?.image} alt={item?.name} />
        </figure>
        <div>
          <h4 className={`${styles.title}`}>{item?.name}</h4>
          <p className={` ${styles.price}`}>${item?.price}</p>
          <Counter
            count={quantity}
            incrementHandler={() => {
              incrementHandler(item?.id);
            }}
            decrementHandler={() => {
              decrementHandler(item?.id);
            }}
            subBtnDisable={quantity === 1 ? true : false}
            plusBtnDisable={quantity > 500 ? true : false}
          />
        </div>
      </div>

      {/* right side  */}
      <div className="d-flex flex-column   gap-3">
        <button
          type="button"
          className={styles.close_btn}
          onClick={()=>{removeHandler(item?.id) ; }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 20 20"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
        <h4 className={`${styles.total}`}>${price}</h4>
        <p className={`${styles.unit}`}>
          {quantity * item?.count_per_quantity + " " + item?.unit} per unit
        </p>
      </div>
    </div>
  );
}

export default CheckoutItem;
