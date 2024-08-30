import styles from "./HotelRoom.module.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Landing Page/Navbar";

export default function HotelRoom() {
  const location = useLocation();
  const { room } = location.state || {};
  const navigate = useNavigate();

  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  if (!room) {
    return <div>No room data available</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to make a reservation.");
      navigate("/registration");
      return;
    }

    // Calculate the duration based on arrival and departure dates
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    const duration = (departure - arrival) / (1000 * 60 * 60 * 24); // duration in days

    // Prepare the data to send to the backend
    const reservationData = {
      hotel_id: room.hotel_id,
      category_id: room.category_id,
      duration: duration,
    };

    try {
      const response = await fetch("http://localhost:5000/user/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Reservation created successfully");
        navigate("/reservations"); // Redirect to status page after successful reservation
      } else {
        const errorData = await response.json();
        alert("Error creating reservation: " + errorData.error);
        navigate("/reservations");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Error creating reservation: " + error.message);
    }
  };

  return (     
     <><Navbar /><div className={styles.hotelRoomContainer}>
    <div className={styles.hotelRoomLeftCol}>
      <img
        src={`http://localhost:5000/hotel_image/${room.photo || "default.jpg"}`}
        alt={room.type} />
      <div>
        <h1>{room.category_name}</h1>

        <p>
          {room.price} ETB/ <span>NIGHT</span>
        </p>
      </div>
    </div>

    <div className={styles.hotelRoomRightCol}>
      <form onSubmit={handleSubmit}>
        <h1>Check Availability</h1>
        <input
          type="date"
          placeholder="Arrival Date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          required />
        <input
          type="date"
          placeholder="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required />
        <input
          type="submit"
          className={styles.submitBtn}
          value="RESERVE NOW" />
      </form>
    </div>
  </div></>
  );
}
