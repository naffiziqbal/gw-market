import React from "react";
import BackButton from "../ui/BackButton";
import CheckoutItem from "./CheckoutItem";
import styles from "./CheckoutList.module.scss";

function CheckoutList({ data = [], subTotal, shippingPrice }) {
  if (data && data?.cartItems?.length > 0) {
    return (
      <div className={`${styles.CheckoutList}`}>
        <div className="d-flex gap-2 align-items-center d-lg-block">
          <BackButton />
          <h2 className={`${styles.heading}`}>Continue Shopping</h2>
        </div>
        <ul className={`list-unstyled`}>
          {data.cartItems.map((value) => (
            <li key={value?.item?.id}>
              <CheckoutItem product={value} />
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

  return <div>list data not found</div>;
}

export default CheckoutList;
