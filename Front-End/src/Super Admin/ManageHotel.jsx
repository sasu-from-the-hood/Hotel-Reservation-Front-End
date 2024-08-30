import React, { useState, useEffect } from "react";
import styles from "./ManageHotel.module.css";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    hotel_name: "",
    location: "",
    photo: null,
    rating: 0, // Default rating
    subaccount_id: "",
  });
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    admin_type: "",
    hotel_id: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [editingHotel, setEditingHotel] = useState(null);

  useEffect(() => {
    // Fetch hotels from the backend
    fetch("http://localhost:5000/superadmin/statistics")
      .then((response) => response.json())
      .then((data) => {
        setHotels(data.hotels);
      })
      .catch((error) => console.error(error));
  }, []);

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

  const handleAdminChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const submitNewHotel = () => {
    const formData = new FormData();
    formData.append("hotel_name", newHotel.hotel_name);
    formData.append("location", newHotel.location);
    formData.append("photo", newHotel.photo);
    formData.append("rating", newHotel.rating);
    formData.append("subaccount_id", newHotel.subaccount_id);

    fetch("http://localhost:5000/superadmin/add_hotels", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowAddHotelModal(false);

        // Automatically open the add admin modal and set the hotel ID
        setNewAdmin((prevAdmin) => ({
          ...prevAdmin,
          hotel_id: data.hotel,
        }));
        setShowAddAdminModal(true);

        // Refresh the hotel list
        setHotels((prevHotels) => [
          ...prevHotels,
          { ...newHotel, hotel_id: data.hotel },
        ]);
      })
      .catch((error) => console.error(error));
  };

  const submitNewAdmin = () => {
    fetch("http://localhost:5000/superadmin/add_admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdmin),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowAddAdminModal(false);
        setSuccessMessage("Admin successfully added!");

        // Clear the success message after a delay
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteHotel = (hotel_id) => {
    fetch(`http://localhost:5000/superadmin/delete_hotel/${hotel_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Remove deleted hotel from the list
        setHotels((prevHotels) =>
          prevHotels.filter((hotel) => hotel.hotel_id !== hotel_id)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.manageHotels}>
      <h1>Manage Hotels</h1>
      <button onClick={() => setShowAddHotelModal(true)}>
        Add a New Hotel
      </button>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

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
                <button>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => handleDeleteHotel(hotel.hotel_id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing a new hotel */}
      <Modal
        isOpen={showAddHotelModal}
        title={editingHotel ? "Edit Hotel" : "Add New Hotel"}
        onClose={() => {
          setShowAddHotelModal(false);
          setEditingHotel(null);
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitNewHotel();
          }}
        >
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
              required
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

      {/* Modal for adding a new admin */}
      <Modal
        isOpen={showAddAdminModal}
        title="Add New Admin"
        onClose={() => setShowAddAdminModal(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitNewAdmin();
          }}
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newAdmin.name}
              onChange={handleAdminChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleAdminChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={newAdmin.password}
              onChange={handleAdminChange}
              required
            />
          </div>
          <div>
            <label>Admin Type</label>
            <input
              type="text"
              name="admin_type"
              value={newAdmin.admin_type}
              onChange={handleAdminChange}
              required
            />
          </div>
          <div>
            <label>Hotel ID</label>
            <input
              type="text"
              name="hotel_id"
              value={newAdmin.hotel_id}
              onChange={handleAdminChange}
              readOnly
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageHotels;
