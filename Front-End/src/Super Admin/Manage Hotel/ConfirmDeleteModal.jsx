import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ConfirmDeleteModal.module.css";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.modalOpen);
    } else {
      document.body.classList.remove(styles.modalOpen);
    }
    return () => document.body.classList.remove(styles.modalOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Sure You Want To Delete?</h3>
        <p>Are You Sure You Want To Delete This Hotel?</p>
        <div className={styles.warning}>
          <div className={styles.warn}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              style={{ fontSize: "20px" }}
            />
            <h3>Warning</h3>
          </div>
          <span>
            By deleting this hotel you won't be able to access the system.
          </span>
        </div>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.confirm}`}
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={onClose}
          >
            No, Cancel
          </button>
        </div>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={onClose}
          className={styles.icon}
        />
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
