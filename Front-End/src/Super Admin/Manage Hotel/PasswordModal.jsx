import React, { useEffect, useState } from "react";
import styles from "./PasswordModal.module.css";

const AdminPasswordModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");

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
        <h3 className={styles.modalHeader}>Enter Admin Password</h3>
        <div className={styles.inputContainer}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.passwordInput}
            placeholder="Password"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.confirm}`}
            onClick={() => onConfirm(password)}
          >
            Confirm
          </button>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordModal;
