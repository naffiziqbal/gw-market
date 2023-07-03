import React from "react";
import ContactItem from "../../components/contact/ContactItem";
import ContactForm from "../../components/form/contactForm";
import styles from "./contact.module.scss";

function Contact() {
  return (
    <div className="custom__container ">
      <div className={`${styles.contact}`}>
        <div className="my-2">
          <ContactForm />
        </div>
        <div>
          <ContactItem />
        </div>
      </div>
    </div>
  );
}

export default Contact;
