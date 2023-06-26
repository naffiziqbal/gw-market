import React from "react";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/features/addToCart/cartSlice";
import Counter from "../ui/cart/Counter";
import styles from "./CheckoutItem.module.scss";

function CheckoutItem({ product }) {
  const { quantity, item } = product;
  const dispatch = useDispatch();

  const incrementHandler = (id) => {
    dispatch(increment({ id }));
  };
  const decrementHandler = (id) => {
    dispatch(decrement({ id }));
  };

  return (
    <div
      className={` ${styles.checkoutItem}  `}
    >
      {/* left side  */}
      <div className="d-flex sm:gap-4">
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
            plusBtnDisable={quantity > 500  ? true : false}
          />
        </div>
      </div>

      {/* right side  */}
      <div className="d-flex flex-column  justify-content-end gap-3">
        <h4 className={`${styles.total}`}>${item?.sum_price}</h4>
        <p className={`${styles.unit}`}>
          {item?.sum_count_per_quantity + " " + item?.unit} per unit
        </p>
      </div>
    </div>
  );
}

export default CheckoutItem;
