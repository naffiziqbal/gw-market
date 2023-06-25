import React from "react";
import styles from "./BackButton.module.scss";

function BackButton() {
  return (
    <>
      <button
        type="button"
        className={`${styles.back_btn}`}
        onClick={() => history.back()}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.57 5.92999L3.5 12L9.57 18.07"
            stroke="#FF9900"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.4999 12H3.66992"
            stroke="#FF9900"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}

export default BackButton;
