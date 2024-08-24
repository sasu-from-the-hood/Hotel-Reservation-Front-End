import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./reserv.module.css";

const Reserv = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/status", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReservations(response.data);
      } catch (error) {
        setError("Failed to fetch reservations.");
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handlePayment = async (totalAmount, id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/initialize?amount=${totalAmount}&hotel_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (
        response.data.status === "success" &&
        response.data.data?.checkout_url
      ) {
        window.location.href = response.data.data.checkout_url;
      } else {
        console.error("No valid checkout URL found in the response.");
      }
    } catch (error) {
      console.error("Error handling payment:", error.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.reservationsContainer}>
      {reservations.length === 0 ? (
        <div>No reservations found</div>
      ) : (
        <div className={styles.cardsContainer}>
          {reservations.map((reservation) => (
            <div key={reservation.reservation_id} className={styles.card}>
              <h2>Reservation ID: {reservation.reservation_id}</h2>
              <p>
                <strong>Hotel ID:</strong> {reservation.hotel_id}
              </p>
              <p>
                <strong>Category ID:</strong> {reservation.category_id}
              </p>
              <p>
                <strong>Room Number:</strong> {reservation.room_number}
              </p>
              <p>
                <strong>Reservation Date:</strong>{" "}
                {new Date(reservation.reservation_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Duration:</strong> {reservation.duration} nights
              </p>
              <p>
                <strong>Total Price:</strong> {reservation.total_price} ETB
              </p>
              <p>
                <strong>Status:</strong> {reservation.reservation_status}
              </p>
              {reservation.reservation_status === "accepted" && (
                <button
                  className={styles.payButton}
                  onClick={() =>
                    handlePayment(reservation.total_price, reservation.hotel_id)
                  }
                >
                  Pay
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reserv;
