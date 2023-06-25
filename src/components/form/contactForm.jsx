import React from "react";
import styles from "./contactForm.module.scss";

function ContactForm() {
  return (
    <>
      <div className={`${styles.contact_form}`}>
        <form action="" id="contact_form">
          <div className={`${styles.contact_form_container}`}>
            {/* receiver contact  */}
            <div className={`${styles.receiver_contact}`}>
              <h3 className={`${styles.heading}`}>Receiver contact</h3>
              <div className="d-flex flex-column gap-3">
                <input type="tel" placeholder="Phone Number" required />
                <input type="password" placeholder="Password" required />
              </div>
            </div>
            {/* receiver address  */}
            <div className={`${styles.receiver_address}`}>
              <h3 className={`${styles.heading}`}>Receiver Address</h3>
              <div className={`d-flex flex-column gap-3`}>
                <div>
                  <input type="text" placeholder="Street Address" />
                </div>

                <div className="d-flex flex-md-row flex-column  justify-content-between gap-5">
                  <input type="text" placeholder="Province (or City)" />
                  <input
                    type="text"
                    placeholder="District"
                    className={`${styles.district_input}`}
                  />
                </div>

                <div className={`${styles.commune}`}>
                  <input type="text" placeholder="Ward (or Commune)" required />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`d-flex justify-content-center align-items-center mt-5 gap-5`}
          >
            <button type="reset" className="  custom_btn">
              Clear
            </button>
            <button type="submit" className=" custom_btn " form="contact_form">
              Add contact
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
