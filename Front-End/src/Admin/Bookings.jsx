import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "./Bookings.module.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm)
  );

  return (
    <>
      <Header />
      <input
        className={styles.roomSearch}
        type="text"
        placeholder="Search for booking"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Guest Name</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.id}</td>
              <td>{booking.guestName}</td>
              <td>{booking.roomNumber}</td>
              <td>{booking.roomType}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.status}</td>
              <td>
                <button className={styles.actionButton}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Bookings;

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainerLeft}>
        <h2>Bookings</h2>
        <span>This is where you can see the bookings</span>
      </div>
      <div className={styles.headerContainerRight}>
        <FontAwesomeIcon icon={faBell} className={styles.notification} />
        <div>AD</div>
      </div>
    </div>
  );
}
