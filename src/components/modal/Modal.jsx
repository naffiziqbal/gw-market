import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

function Modal({ isOpen, onClose, children, title }) {

  if (!isOpen) return null;
  return createPortal(
    <>
      <div className={`${styles.modal}`}>
        <div className={`${styles.overlay}`} onClick={onClose}></div>

        <div className= {styles.modal_body}>
          {/* modal header  */}
          <div className={`${styles.modal_header}`}>
            <h4>{title || "Modal"}</h4>
            <button type="button" onClick={onClose}>
              x
            </button>
          </div>
          {/* body  */}
          <div className="w-100">{children}</div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default Modal;
