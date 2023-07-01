import React from "react";
import home from "../../assets/images/home.svg";
import office from "../../assets/images/office.svg";
import styles from "./SelectContact.module.scss";

function SelectContact({ label = "office" }) {
  return (
    <div className={`${styles.select_contact} bg-black  text-white`}>
      {/* label  */}

      <div className={`d-flex  align-items-center justify-content-between `}>
        <div className="d-flex align-items-center gap-1">
          <img src={label === "office" ? office : home} alt="" />
          <span className="text-white">Office</span>
        </div>
        {/* radio */}
        <div className={`${styles.radio}`}></div>
      </div>

      {/* contact number  */}
      <p className= {`my-3`}>+1 232 4345 23</p>
      {/* address  */}
      <address>2972 Westheimer Rd. Santa Ana, Illinois 85486</address>
    </div>
  );
}

export default SelectContact;
