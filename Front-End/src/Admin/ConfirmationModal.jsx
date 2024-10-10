import React, { useEffect } from "react";
import styles from "./ConfirmationModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  // Use useEffect to toggle the no-scroll class on the body element
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    // Cleanup to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null; // Don't render the modal if it isn't open

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Confirm Logout</h3>
        <p>sure you want to log out?</p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Yes, Logout
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
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

export default ConfirmationModal;
