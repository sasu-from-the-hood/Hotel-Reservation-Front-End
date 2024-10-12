import React, { useEffect, useState } from "react";
import styles from "./EditHotelModal.module.css";

const EditHotelModal = ({ isOpen, onClose, hotelData, onSubmit }) => {
  const [hotelName, setHotelName] = useState(hotelData.hotel_name || "");
  const [location, setLocation] = useState(hotelData.location || "");
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setHotelName(hotelData.hotel_name || "");
      setLocation(hotelData.location || "");
      setPicture(null);
      document.body.classList.add(styles.modalOpen);
    } else {
      document.body.classList.remove(styles.modalOpen);
    }
    return () => document.body.classList.remove(styles.modalOpen);
  }, [isOpen, hotelData]);

  const handleSubmit = () => {
    const updatedHotelData = {
      ...hotelData,
      hotel_name: hotelName,
      location,
    };

    if (picture) {
      updatedHotelData.picture = picture;
    }

    onSubmit(updatedHotelData);
    onClose();
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeader}>Edit Hotel</h2>

        <div className={styles.inputContainer}>
          <label>Hotel Name:</label>
          <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className={styles.textInput}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.textInput}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            className={styles.fileInput}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={handleSubmit}
            className={`${styles.button} ${styles.saveButton}`}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHotelModal;
