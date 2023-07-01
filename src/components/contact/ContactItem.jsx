import React, { useState } from "react";
import { useSendOTPMutation, useVerifyOTPMutation } from "../../redux/features/OTP/OTPapi";
import { useGetContactQuery } from '../../redux/features/contact/contactAPI';
import Modal from "../modal/Modal";



function ContactItem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [sendOTP, { data, isError }] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const [contactId , setContactId] = useState()

  const { data: contactData } = useGetContactQuery();
console.log(code);
  // modal
  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  // otp send handler
  const sendHandler = async (id) => {
    setContactId(id)
    const data = await sendOTP({ customer_contact: id });
    console.log(data);
  };

  
  const verifyHandler = async () =>{
      console.log(parseInt(code));
     console.log(contactId);
     const data = await verifyOTP({ customer_contact: contactId , otp_code: parseInt(code) })
     console.log(data);
  }

  return (
    <div>
      {contactData?.contacts?.map((value) => (
        <div key={value?.id}>
          <p>id: {value?.id}</p>
          <p>id: {value?.receiver_name}</p>
          <address>address: {value?.address}</address>
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

          <button type="button" className="custom_btn py-1 px-2" onClick={verifyHandler}>
            Verify
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ContactItem;
