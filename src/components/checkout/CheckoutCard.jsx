import React from "react";
import CheckoutBtn from "./CheckoutBtn";
import styles from './CheckoutCard.module.scss';


function CheckoutCard({items , subTotal , shipping}) {
  return (
    <div className= {`${styles.checkoutCard}`}>
      <ul className="list-unstyled d-flex flex-column gap-3">
        <li>
          <div className={`${styles.pricing}`}>
            <p>
              Subtotal
              <span className={`${styles.subtext}`}>(item)</span>
            </p>
            <span>{items}</span>
          </div>
          <div className={`${styles.divider}`}></div>
        </li>
        <li>
          <div className={`${styles.pricing}`}>
            <p>
              Price
              <span className={`${styles.subtext}`}>(Total)</span>
            </p>
            <span>{subTotal} <span className={`${styles.subtext}`}> VND</span> </span>
          </div>
          <div className={`${styles.divider}`}></div>
        </li>
        <li>
          <div className={`${styles.pricing}`}>
            <p>Shipping</p>
            <span>{shipping} <span className={`${styles.subtext}`}> VND</span></span>
          </div>
          <div className={`${styles.divider}`}></div>
        </li>
        <li>
          <div className={`${styles.pricing}`}>
            <p>Total</p>
            <span>{subTotal+shipping } <span className={`${styles.subtext}`}> VND</span></span>
          </div>
         
        </li>
      </ul>
     <CheckoutBtn/>
    </div>
  );
}

export default CheckoutCard;
