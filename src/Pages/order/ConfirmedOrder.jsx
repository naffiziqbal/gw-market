import React from "react";
import { Link } from "react-router-dom";
import "./ConfirmedOrder.scss";


function confirmedOrder() {
  return (
    <div className="custom__container">
      <div className="confirmed_order_page">
        <div className="confirmed_order_success_text text-center  my-4">
          <p className="fs-3 mb-2">Mã đơn order.order_id của bạn đang được xử lý</p>
          <p>Cảm ơn username đã chọn dịch vụ HeoBZ của chúng tôi.</p>
        </div>

        {/* ------------------------- delivery car animation -------------------------  */}
        <div className="delivery_car_animation">
          <div className="confirmed_order_container">
            <div className="car-wrapper">
              <div className="car-wrapper_inner">
                <div className="car_outter">
                  <div className="car">
                    <div className="body">
                      <div />
                    </div>
                    <div className="decos">
                      <div className="line-bot" />
                      <div className="door">
                        <div className="handle" />
                        <div className="bottom" />
                      </div>
                      <div className="window" />
                      <div className="light" />
                      <div className="light-front" />
                      <div className="antenna" />
                      <div className="ice-cream">
                        <div className="cone" />
                      </div>
                    </div>
                    <div>
                      <div className="wheel" />
                      <div className="wheel" />
                    </div>
                    <div className="wind">
                      <div className="p p1" />
                      <div className="p p2" />
                      <div className="p p3" />
                      <div className="p p4" />
                      <div className="p p5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-stuff">
              <div className="bg" />
              <div className="bg bg-2" />
              <div className="bg bg-3" />
              <div className="ground" />
            </div>
          </div>
        </div>
        <div className="mt-3">
            <Link to={"/"}>Back To shop</Link>
          </div>
      </div>
    </div>
  );
}

export default confirmedOrder;
