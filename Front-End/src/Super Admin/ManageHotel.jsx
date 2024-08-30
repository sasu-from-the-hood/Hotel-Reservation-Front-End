import React, { useState, useEffect } from "react";
import styles from "./ManageHotel.module.css";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    hotel_name: "",
    location: "",
    photo: "",
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
    fetch("http://localhost:5000/hotels")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
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
    const file = e.target.files[0];
    setNewHotel((prevHotel) => ({
      ...prevHotel,
      photo: file,
    }));
  };

  const handleAdminChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const submitNewHotel = () => {
    const hotelData = {
      ...newHotel,
      rating: 0, // Set default rating
      subaccount_id: "sub_" + Math.random().toString(36).substr(2, 9), 
      id: Math.random().toString(36).substr(2, 9), 
    };

    fetch("http://localhost:5000/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotelData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowAddHotelModal(false);

        // Automatically open the add admin modal and set the hotel ID
        setNewAdmin((prevAdmin) => ({
          ...prevAdmin,
          hotel_id: data.hotel_id,
        }));
        setShowAddAdminModal(true);

        // Refresh the hotel list
        setHotels((prevHotels) => [...prevHotels, data]);
      })
      .catch((error) => console.error(error));
  };

  const submitNewAdmin = () => {
    const adminData = {
      ...newAdmin,
      hotel_id: newAdmin.hotel_id || newHotel.hotel_id, // Ensure hotel_id is set
    };

    fetch("http://localhost:5000/HotelAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
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

  const getCategoriesForHotel = (hotelId) => {
    return categories
      .filter((category) => category.hotel_id === hotelId)
      .map((category) => category.category_name)
      .join(", ");
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
            <th>Categories</th>
            <th>Action</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.hotel_id}>
              <td>{hotel.hotel_id}</td>
              <td>{hotel.hotel_name}</td>
              <td>{hotel.rating}</td>
              <td>{getCategoriesForHotel(hotel.hotel_id) || "N/A"}</td>
              <td>
                <button
                //  onClick={() => handleEditHotel(hotel)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  // onClick={() => handleDeleteHotel(hotel.hotel_id)}
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
          setEditingHotel(null); // Clear editing hotel state
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
              required={!editingHotel} // Photo is not required for editing
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
              type="number"
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
