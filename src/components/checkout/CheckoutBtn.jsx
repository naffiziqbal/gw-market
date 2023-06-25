import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function CheckoutBtn() {
  const isAuth = useAuth();

  let link = isAuth ? '/confirm_order' : '/login?from=checkout'

  return (
    <div className="checkout__btn_wrapper">
      <Link to={link}>
        <button type="button" className={`checkout__btn`}>
          Checkout Now{" "}
        </button>
      </Link>
    </div>
  );
}

export default CheckoutBtn;
