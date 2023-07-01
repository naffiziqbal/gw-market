import React from "react";
import ContactItem from "../../components/contact/ContactItem";
import ContactForm from "../../components/form/contactForm";

function Contact() {




  return (
    <div className="custom__container ">
      <div className="d-flex ">
        <div>
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
