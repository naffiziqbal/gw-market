import React from "react";
import CheckoutCard from "../../components/checkout/CheckoutCard";
import CheckoutList from "../../components/checkout/CheckoutList";
import { useCart } from "../../hooks/useCart";

function Checkout() {
  const { getData, subTotalPrice, getLength } = useCart();

  const subTotal = subTotalPrice();
  const length = getLength();

    return (
      <div className="custom__container">
        <div className="row gap-lg-0 gap-4 flex-shrink-1">
          <div className="col-lg-8 ">
            <CheckoutList
              data={getData}
              subTotal={subTotal}
              shippingPrice={20}
            />
          </div>
          <div className="col-lg-4 ">
            <CheckoutCard subTotal={subTotal} items={length} shipping={20} />
          </div>
        </div>
      </div>
    );
  }


export default Checkout;
