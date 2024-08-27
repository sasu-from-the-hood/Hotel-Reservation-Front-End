import React, { useState, useEffect } from "react";
import styles from "./ManualReservation.module.css";

const ManualReservation = () => {
  const [categories, setCategories] = useState([]);
  const [reservation, setReservation] = useState({
    name: "",
    phone_number: "",
    category_id: "",
    check_in_date: "",
    check_out_date: "",
    duration: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => {
        // Remove duplicate category names
        const uniqueCategories = data.reduce((acc, current) => {
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

  const calculateDuration = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate - checkInDate;
    const duration = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return duration > 0 ? Math.ceil(duration) : 0; // Use Math.ceil to ensure rounding up
  };

  useEffect(() => {
    if (reservation.check_in_date && reservation.check_out_date) {
      const duration = calculateDuration(
        reservation.check_in_date,
        reservation.check_out_date
      );
      setReservation((prev) => ({
        ...prev,
        duration: duration,
      }));
    }
  }, [reservation.check_in_date, reservation.check_out_date]);

  const handleManualReservation = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Manual reservation created successfully");
        setReservation({
          name: "",
          phone_number: "",
          category_id: "",
          check_in_date: "",
          check_out_date: "",
          duration: "",
        });
      })
      .catch((error) => console.error("Error creating reservation:", error));
  };

  return (
    <div className={styles.container}>
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
          <label>Check-in Date:</label>
          <input
            type="date"
            name="check_in_date"
            value={reservation.check_in_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Check-out Date:</label>
          <input
            type="date"
            name="check_out_date"
            value={reservation.check_out_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Duration (days):</label>
          <input
            type="text"
            name="duration"
            value={reservation.duration}
            readOnly
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
