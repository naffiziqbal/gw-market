import React from "react";
import styles from "./categories.module.scss";

const Categories = ({ content = {}  , isActive = false , clickHandler}) => {

  return (
    <div>
 
          <button
            type="button"
            className={`d-flex align-items-center  ${styles.category_card_btn} ${isActive ? styles.active : ''}`}
            key={content?.id}
            onClick={()=>{clickHandler(content)}}
            disabled = {isActive}
          >
            <img src={content?.image} alt="" />
            <p className= {`${styles.heading}`}>{content?.name}</p>
          </button>
    </div>
  );
};

export default Categories;
