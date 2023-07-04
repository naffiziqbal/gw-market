import React, { useState } from "react";
import home from "../../assets/images/home.svg";
import office from "../../assets/images/office.svg";
import styles from "./SelectContact.module.scss";

function SelectContact({ contact, selectHandler }) {
  const [selectedStyle, setSelectedStyle] = useState(null);

  // console.log(selectedStyle);
  return (
    <>
      <div className={`${styles.selectedContactSection}`}>
        <div
          className={`${styles.select_contact}  text-white  `}
          onClick={() => {
            selectHandler(contact?.label);
            setSelectedStyle("selected");
          }}
        >

          <div
            className={`d-flex  align-items-center justify-content-between `}
          >
            <div className="d-flex align-items-center gap-1">
              <img src={contact?.label === "Office" ? office : home} alt="" />
              <span className={`${styles.contactLabel}`}>{contact?.label}</span>
            </div>
            {/* radio */}
            <div
              className={` ${
                selectedStyle === "selected" ? styles.selected : styles.radio
              }`}
            ></div>
          </div>

          {/* contact number  */}
          <p className={`my-3 ${styles.phone_number}`} >{contact?.phone_number}</p>
          {/* address  */}
          <address>
            <p>{contact?.address}</p>
            <p className=""><span className="fw-bold">City: &nbsp; </span>{contact?.province_city}</p>
            <p><span className="fw-bold">Wards commune: &nbsp; </span> {contact?.ward_commune}</p>
          </address>
        </div>
      </div>
    </>
  );
}

export default SelectContact;
