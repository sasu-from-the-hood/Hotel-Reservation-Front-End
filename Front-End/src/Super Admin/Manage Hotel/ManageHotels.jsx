import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../ManageHotel.module.css";
import HotelTable from "./HotelTable";
import AddHotelModal from "./AddHotelModal";
import AddAdminModal from "./AddAdminModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import PasswordModal from "./PasswordModal";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    admin_type: "",
    hotel_id: "",
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = () => {
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
        setHotels([]);
      });
  };

  const handleSubmitHotel = (newHotel) => {
    const formData = new FormData();
    for (const key in newHotel) {
      formData.append(key, newHotel[key]);
    }

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

  const handleSubmitAdmin = (adminData) => {
    axios
      .post("http://localhost:5000/superadmin/add_admin", adminData, {
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

  const handleDeleteClick = (hotel_id) => {
    setHotelToDelete(hotel_id);
    setShowConfirmDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDeleteModal(false);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (password) => {
    axios
      .delete(
        `http://localhost:5000/superadmin/delete_hotel/${hotelToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Password: password,
          },
        }
      )
      .then(() => {
        setHotels((prevHotels) =>
          prevHotels.filter((hotel) => hotel.hotel_id !== hotelToDelete)
        );
        setHotelToDelete(null);
        setShowPasswordModal(false);
        toast.success("Hotel deleted successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error || "Error deleting hotel");
        setShowPasswordModal(false);
      });
  };

  return (
    <div className={styles.manageHotels}>
      <h1>Manage Hotels</h1>
      <button onClick={() => setShowAddHotelModal(true)}>
        Add a New Hotel
      </button>

      <HotelTable hotels={hotels} onDeleteHotel={handleDeleteClick} />

      <AddHotelModal
        isOpen={showAddHotelModal}
        onClose={() => setShowAddHotelModal(false)}
        onSubmit={handleSubmitHotel}
      />

      <AddAdminModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onSubmit={handleSubmitAdmin}
        newAdmin={newAdmin} // Pass newAdmin here
        setNewAdmin={setNewAdmin} // Allows updating from within modal if needed
      />

      <ConfirmDeleteModal
        isOpen={showConfirmDeleteModal}
        onClose={() => setShowConfirmDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
      />

      <ToastContainer />
    </div>
  );
};

export default ManageHotels;
