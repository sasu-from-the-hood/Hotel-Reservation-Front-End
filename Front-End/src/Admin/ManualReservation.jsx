import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./ManualReservation.module.css";

const ManualReservation = () => {
  const [categories, setCategories] = useState([]);
  const [reservation, setReservation] = useState({
    name: "",
    phone_number: "",
    category_id: "",
    duration: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const uniqueCategories = response.data.reduce((acc, current) => {
          const x = acc.find(
            (item) => item.category_name === current.category_name
          );
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle input change for reservation form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  const handleManualReservation = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/admin/manualreservation",
        reservation,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success("Manual reservation created successfully");
        setTimeout(() => {
          navigate("/admindashboard");
        }, 3000); // Redirect after 3 seconds
      })
      .catch((error) => {
        toast.error("Error creating reservation"+error.error);
        console.error("Error creating reservation:", error.error);
      });
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1>Admin Manual Reservation</h1>

      <form onSubmit={handleManualReservation} className={styles.formContainer}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={reservation.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={reservation.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category_id"
            value={reservation.category_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Duration (days):</label>
          <input
            type="number"
            name="duration"
            value={reservation.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.btn}>
          <button type="submit">Create Reservation</button>
        </div>
      </form>
    </div>
  );
};

export default ManualReservation;
