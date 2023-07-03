import React, { useEffect, useState } from "react";
import SelectContact from "../../components/select/SelectContact";
import { useGetContactQuery } from "../../redux/features/contact/contactAPI";
import { deleteQuery } from "../../utils/loginUtils";
import styles from "./ConfirmOrder.module.scss";
import addBtnImg from "../../assets/images/carbon_add-filled.svg";
// component
function ConfirmOrder() {
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
      <div className={`${styles.confirm_order}`}>
        <div className={`${styles.main}`}>
          <div className={`${styles.paymentInfo}`}></div>
          {/* contact  */}
          <div className={`${styles.rightSection}`}>
            <div className={`col-"5" ${styles.contactSection}`}>
              <div className={` "row"  ${styles.contact} `}>
                {data?.contacts?.map((contact) => (
                  <div key={contact?.id} className={`"col col-xl-6"`}>
                    <SelectContact
                      contact={contact}
                      selectHandler={selectHandler}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.cardOption}`}>
              <p className="h6"> Debit/Credit Card Payment</p>
              <div className={`${styles.cardItems}`}>
                <p className="h5">Total Pay</p>
                <p className={` h5 fw-bold`}>$620.54</p>
              </div>
            </div>
            <div className={`${styles.paymentButton}`}>
              <button className={`${styles.buttonCancel}`}>Cancel</button>
              <button className={`${styles.buttonPlace}`}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
