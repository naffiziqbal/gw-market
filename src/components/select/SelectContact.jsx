import React from "react";
import home from "../../assets/images/home.svg";
import office from "../../assets/images/office.svg";
import styles from "./SelectContact.module.scss";

function SelectContact({ contact ,  selectHandler }) {
   


  return (
    <div className={`${styles.select_contact}  text-white`} onClick={()=>{selectHandler(contact?.label)}} >
      {/* label  */}

      <div className={`d-flex  align-items-center justify-content-between `}>
        <div className="d-flex align-items-center gap-1">
          <img src={contact?.label === "Office" ? office : home} alt="" />
          <span className="text-white">{contact?.label}</span>
        </div>
        {/* radio */}
        <div className={`${styles.radio}`}></div>
      </div>

      {/* contact number  */}
      <p className= {`my-3`}>{contact?.phone_number}</p>
      {/* address  */}
      <address>
        <p>{contact?.address}</p>
        <p>City: {contact?.province_city}</p>
        <p>Ward commune: {contact?.ward_commune}</p>
      </address>
    </div>
  );
}

export default SelectContact;
