import { useState, useEffect } from "react";
import Modal from "../Modal";
import styles from "../ManageHotel.module.css";

const AddHotelModal = ({ isOpen, onClose, onSubmit, editingHotel }) => {
  const [newHotel, setNewHotel] = useState({
    hotel_name: "",
    location: "",
    photo: null,
    rating: 0,
    subaccount_id: "",
  });

  useEffect(() => {
    if (editingHotel) {
      setNewHotel(editingHotel);
    }
  }, [editingHotel]);

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prevHotel) => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setNewHotel((prevHotel) => ({
      ...prevHotel,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newHotel);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={editingHotel ? "Edit Hotel" : "Add New Hotel"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hotel Name</label>
          <input
            type="text"
            name="hotel_name"
            value={newHotel.hotel_name}
            onChange={handleHotelChange}
            required
          />
        </div>
        <div>
          <label>Location (URL)</label>
          <input
            type="text"
            name="location"
            value={newHotel.location}
            onChange={handleHotelChange}
            required
          />
        </div>
        <div>
          <label>Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handlePhotoChange}
            required={!editingHotel}
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={newHotel.rating}
            onChange={handleHotelChange}
            required
          />
        </div>
        <div>
          <label>Subaccount ID</label>
          <input
            type="text"
            name="subaccount_id"
            value={newHotel.subaccount_id}
            onChange={handleHotelChange}
            required
          />
        </div>
        <div className={styles.btn}>
          <button type="submit">
            {editingHotel ? "Save Changes" : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddHotelModal;
