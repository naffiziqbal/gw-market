import React, { useState } from "react";
import home from "../../assets/images/home.svg";
import office from "../../assets/images/office.svg";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../redux/features/OTP/OTPapi";
import { useGetContactQuery } from "../../redux/features/contact/contactAPI";
import Modal from "../modal/Modal";
import styles from "./contactItem.module.scss";

function ContactItem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [sendOTP, { data, isError }] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const [contactId, setContactId] = useState();

  const { data: contactData } = useGetContactQuery();
  console.log(contactData, "Contact Data");
  // modal
  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  // otp send handler
  const sendHandler = async (id) => {
    setContactId(id);
    const data = await sendOTP({ customer_contact: id });
    console.log(data);
  };

  console.log(
    contactData?.contacts.map((value) => {
      console.log(value);
    })
  );

  const verifyHandler = async () => {
    console.log(parseInt(code));
    console.log(contactId);
    const data = await verifyOTP({
      customer_contact: contactId,
      otp_code: parseInt(code),
    });
  };


  return (
    <div className={`${styles.mainContactItems}`}>
      <p className="h6">Contact</p>
      {contactData?.contacts?.map((value) => (
        <div key={value?.id} className={`${styles.items}`}>
          <div>
            <div>
              <>
                <div className="d-flex align-items-center gap-1">
                  <img src={value?.label === "Office" ? office : home} alt="" />
                  <span className={`${styles.contactLabel}`}>
                    {value?.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      modalOpenHandler();
                      sendHandler(value?.id);
                    }}
                  >
                    verify
                  </button>
                </div>

                {/* contact number  */}
                <p className={`my-2`}>{value?.phone_number}</p>
                {/* address  */}
                <address>
                  <p>{value?.address}</p>
                  <p>City: {value?.province_city}</p>
                  <p>Ward commune: {value?.ward_commune}</p>
                </address>
              </>
            </div>
          </div>
        </div>
      ))}

      <Modal isOpen={modalOpen} onClose={modalCloseHandler}>
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            placeholder="Code"
            value={code}
            name="code"
            required
            className="py-1 px-2 my-3 input"
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            type="button"
            className="custom_btn py-1 px-2"
            onClick={verifyHandler}
          >
            Verify
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ContactItem;
