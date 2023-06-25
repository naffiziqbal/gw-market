import React from "react";
import { NavLink } from "react-router-dom";
import cart from "../../../assets/images/cart.svg";
import { useCart } from "../../../hooks/useCart";
import styles from "./Cart.module.scss";

function Cart({link}) {
  const { getLength } = useCart();

  const length = getLength();

  return (
    <NavLink to={link}>
      <div className={`${styles.cart} `}>
        <span className={`${styles.count}`}>{length}</span>
        <img src={cart} alt="cart" width={24} height={24} />
      </div>
    </NavLink>
  );
}

export default Cart;
