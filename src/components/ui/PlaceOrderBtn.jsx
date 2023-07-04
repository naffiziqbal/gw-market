const PlaceOrderBtn = ({ clickHandler, children }) => {
  return (
    <button
      className={` custom_btn px-3 py-2 w-100 d-flex gap-3 justify-content-between  align-items-center`}
    >
      <span>{children}</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.00002 11H16.17L11.29 6.11997C10.9 5.72997 10.9 5.08997 11.29 4.69997C11.68 4.30997 12.31 4.30997 12.7 4.69997L19.29 11.29C19.68 11.68 19.68 12.31 19.29 12.7L12.7 19.29C12.31 19.68 11.68 19.68 11.29 19.29C10.9 18.9 10.9 18.27 11.29 17.88L16.17 13H5.00002C4.45002 13 4.00002 12.55 4.00002 12C4.00002 11.45 4.45002 11 5.00002 11Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default PlaceOrderBtn;
