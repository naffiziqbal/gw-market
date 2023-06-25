import React from "react";
import { Navigate } from "react-router-dom";
import CheckoutCard from "../../components/checkout/CheckoutCard";
import CheckoutList from "../../components/checkout/CheckoutList";
import { useCart } from "../../hooks/useCart";

function Checkout() {
  const { getData, subTotalPrice, getLength } = useCart();

  const subTotal = subTotalPrice();
  const length = getLength();



  if (getData && getData?.cartItems?.length > 0) {
    return (
      <div className="custom__container">
        <div className="row gap-lg-0 gap-4 flex-shrink-1">
          <div className="col-lg-8">
            <CheckoutList
              data={getData}
              subTotal={subTotal}
              shippingPrice={20}
            />
          </div>
          <div className="col-lg-4">
            <CheckoutCard subTotal={subTotal} items={length} shipping={20} />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default Checkout;
