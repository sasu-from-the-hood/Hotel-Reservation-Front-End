import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Reserv.module.css";

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
      {reservations.length === 0 ? (
        <div>No reservations found</div>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation.reservation_id} className={styles.card}>
            <h2>Reservation ID: {reservation.reservation_id}</h2>
            <p><strong>Hotel ID:</strong> {reservation.hotel_id}</p>
            <p><strong>Category ID:</strong> {reservation.category_id}</p>
            <p><strong>Room Number:</strong> {reservation.room_number}</p>
            <p><strong>Reservation Date:</strong> {new Date(reservation.reservation_date).toLocaleDateString()}</p>
            <p><strong>Duration:</strong> {reservation.duration} nights</p>
            <p><strong>Total Price:</strong> {reservation.total_price} ETB</p>
            <p><strong>Status:</strong> {reservation.reservation_status}</p>
            <p><strong>Payment Status:</strong> {reservation.payment_status}</p>
            {reservation.reservation_status === "accepted" && reservation.payment_status === "unpaid" && (
              <button
                className={styles.payButton}
                onClick={() => handlePayment(reservation.total_price, reservation.hotel_id)}
              >
                Pay
              </button>
            )}
          </div>
        ))
      )}
      {checkoutUrl && (
        <div className={styles.checkoutContainer}>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.payButton}
          >
            Pay using Chapa
          </a>
        </div>
      )}
    </div>
  );
};

export default Status;