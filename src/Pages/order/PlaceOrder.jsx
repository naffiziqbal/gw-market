import React, { useEffect, useState } from "react";
import addBtnImg from "../../assets/images/carbon_add-filled.svg";
import SelectContact from "../../components/select/SelectContact";
import PlaceOrderBtn from "../../components/ui/PlaceOrderBtn";
import ComingSoon from "../../components/ui/comingSoon/ComingSoon";
import { useGetContactQuery } from "../../redux/features/contact/contactAPI";
import { deleteQuery } from "../../utils/loginUtils";
import styles from "./placeOrder.module.scss";
// component
function PlaceOrder() {
  const { data } = useGetContactQuery();
  const [selectContact, setSelectContact] = useState("Main");

  // console.log(selectContact);

  useEffect(() => {
    deleteQuery();
  }, []);

  // select handler
  const selectHandler = (label) => {
    setSelectContact(label);
  };

  return (
    <div className={"custom__container"}>
      <div className={`${styles.place_order}`}>
        <div className={`${styles.main}`}>
          <div className={`${styles.paymentInfo}`}>
            <div
              className={`bg-black text-black py-4 rounded-2 px-3 w-100 d-flex justify-content-between align-items-center bg-dark-subtle ${styles.cod}`}
            >
              <label htmlFor="cod" className="text-uppercase ">
                Cash On Delivery
              </label>
              <input type="radio" name="cod" id="cod" checked />
            </div>

            <div className="mt-5">
              <ComingSoon />
            </div>
          </div>
          {/* contact  */}
          <div className={`${styles.rightSection}`}>
            <div className={` ${styles.contactSection}`}>
              {/* contact label  */}
              <div className={`${styles.contactsHeading} `}>
                <p className={`${styles.contactsHeadline}`}>Contacts</p>
                <div className={`${styles.modalButton}`}>
                  <span className="mx-2">
                    {" "}
                    <img src={addBtnImg} alt="" />
                  </span>
                  <span>Add New</span>
                </div>
              </div>
              {/* contact label end   */}

              <div className={`${styles.contact} `}>
                {data?.contacts?.map((contact) => (
                  <div key={contact?.id}>
                    <SelectContact
                      contact={contact}
                      selectHandler={selectHandler}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.balanceCard} my-3`}>
              <p className="h6"> Debit/Credit Card Payment</p>
              <div className={`${styles.cardItems}`}>
                <p className="h5">Total Pay</p>
                <p className={` h5 fw-bold`}>$620.54</p>
              </div>
            </div>
            <div className={`${styles.paymentButton}`}>
              <div className="col-md-5   ">
                <button className={`custom_btn btn_outline px-5 py-2`}>
                  Cancel
                </button>
              </div>
              <div className=" col-md-5 ">
                <PlaceOrderBtn>Place Order</PlaceOrderBtn>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
