import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaHotel, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaClock } from "react-icons/fa"; // Use FaClock for pending status
import styles from "./reserv.module.css";

const Status = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/user/status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReservations(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch reservations.");
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (total_price, hotel_id) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/user/initialize",
        {
          params: { total_price, hotel_id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCheckoutUrl(response.data.checkout_url);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.statusContainer}>
      {/* Reservation Cards */}
      <div className={styles.cardsContainer}>
        {reservations.length === 0 ? (
          <div className={styles.noReservations}>No reservations found</div>
        ) : (
          reservations.map((reservation) => {
            const reservationDate = new Date(reservation.duration);

            return (
              <div key={reservation.reservation_id} className={styles.card}>
                <h2>Reservation ID: {reservation.reservation_id}</h2>

                {/* Group with Icons */}

                <p><FaHotel /> <strong>Hotel ID:</strong> {reservation.hotel_id}</p>
                <p><FaCalendarAlt /> <strong>Date:</strong> {reservationDate.toLocaleDateString()}</p>
                <p><FaMoneyBillWave /> <strong>Total Price:</strong> {reservation.total_price} ETB</p>

                {/* div for brack line*/}
                <div className={styles.line}></div>
                <p>
                  <strong>Status:</strong> {reservation.reservation_status}
                  {reservation.reservation_status === "accepted" ? (
                    <FaCheckCircle color="green" />
                  ) : (
                    <FaClock color="orange" /> // Use FaClock for pending status
                  )}
                </p>




                <p><strong>Duration:</strong> {reservation.duration} nights</p>
                <p><strong>Category ID:</strong> {reservation.category_id}</p>
                <p><strong>Room Number:</strong> {reservation.room_number}</p>
                <p style={{ color: reservation.payment_status === "unpaid" ? "red" : "green" }}>
                  <strong>Payment Status:</strong> {reservation.payment_status}
                </p>


                {reservation.reservation_status === "accepted" && reservation.payment_status === "unpaid" && (
                  <button
                    className={styles.payButton}
                    onClick={() => handlePayment(reservation.total_price, reservation.hotel_id)}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Checkout Link */}
      {checkoutUrl && (
        <footer className={styles.footer}>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.payButton}
          >
            Pay using Chapa
          </a>
        </footer>
      )}
    </div>
  );
};

export default Status;
