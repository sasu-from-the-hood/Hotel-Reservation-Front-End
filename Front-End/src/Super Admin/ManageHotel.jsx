import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ManageHotel.module.css";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    hotel_name: "",
    location: "",
    photo: null,
    rating: 0,
    subaccount_id: "",
  });
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    admin_type: "",
    hotel_id: "",
  });
  const [editingHotel, setEditingHotel] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/superadmin/hotels", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const fetchedHotels = response.data.hotels || [];
        setHotels(
          fetchedHotels.map((hotel) => ({
            hotel_id: hotel.hotel_id,
            hotel_name: hotel.hotel_name,
            rating: hotel.rating,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
        setHotels([]); // Set to an empty array on fetch error
      });
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

  const handleSubmitHotel = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hotel_name", newHotel.hotel_name);
    formData.append("location", newHotel.location);
    formData.append("photo", newHotel.photo);
    formData.append("rating", newHotel.rating);
    formData.append("subaccount_id", newHotel.subaccount_id);

    axios
      .post("http://localhost:5000/superadmin/add_hotels", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const hotel_id = response.data.hotel;

        setNewAdmin((prevAdmin) => ({
          ...prevAdmin,
          hotel_id: hotel_id,
        }));
        setShowAddAdminModal(true);
        setHotels((prevHotels) => [
          ...prevHotels,
          { ...newHotel, hotel_id: hotel_id },
        ]);
        setShowAddHotelModal(false);
        toast.success("Hotel added successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error adding hotel");
      });
  };

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/superadmin/add_admin", newAdmin, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setShowAddAdminModal(false);
        toast.success("Admin successfully added!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error adding admin");
      });
  };

  const handleDeleteHotel = (hotel_id) => {
    axios
      .delete(`http://localhost:5000/superadmin/delete_hotel/${hotel_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setHotels((prevHotels) =>
          prevHotels.filter((hotel) => hotel.hotel_id !== hotel_id)
        );
        toast.success("Hotel deleted successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className={styles.manageHotels}>
      <h1>Manage Hotels</h1>
      <button onClick={() => setShowAddHotelModal(true)}>
        Add a New Hotel
      </button>

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

      <Modal
        isOpen={showAddHotelModal}
        title={editingHotel ? "Edit Hotel" : "Add New Hotel"}
        onClose={() => {
          setShowAddHotelModal(false);
          setEditingHotel(null);
        }}
      >
        <form onSubmit={handleSubmitHotel}>
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

      <Modal
        isOpen={showAddAdminModal}
        title="Add New Admin"
        onClose={() => setShowAddAdminModal(false)}
      >
        <form onSubmit={handleSubmitAdmin}>
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

      <ToastContainer />
    </div>
  );
};

export default ManageHotels;
