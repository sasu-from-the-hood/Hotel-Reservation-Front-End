import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditHotelModal from "./EditHotelModal";
import styles from "../ManageHotel.module.css";

const HotelTable = ({ hotels, onDeleteHotel, onEditHotel }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleEditClick = (hotel) => {
    setSelectedHotel(hotel);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedHotel) => {
    onEditHotel(updatedHotel);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Hotel ID</th>
            <th>Hotel Name</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.hotel_id}>
              <td>{hotel.hotel_id}</td>
              <td>{hotel.hotel_name}</td>
              <td>{hotel.rating}</td>
              <td>
                <button onClick={() => handleEditClick(hotel)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => onDeleteHotel(hotel.hotel_id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <EditHotelModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          hotelData={selectedHotel}
          onSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};

export default HotelTable;
