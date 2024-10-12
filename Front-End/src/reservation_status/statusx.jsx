import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./status.module.css";
import BackToHome from "../components/BackToHome.jsx";

const Reserv = () => {
  const [activeSection, setActiveSection] = useState("status");
  const [reservations, setReservations] = useState([]);
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  useEffect(() => {
    // Fetch data only for the active section
    if (activeSection === "status" && reservations.length === 0) {
      fetchReservations();
    } else if (activeSection === "account" && accountData.name === "") {
      fetchAccountData();
    }
  }, [activeSection]); // Dependency array with activeSection to fetch data when the section changes

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

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/user/account_data",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAccountData(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch account data.");
      console.error("Error fetching account data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.put("http://localhost:5000/user/account_update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Account updated successfully.");
    } catch (error) {
      console.error("Error updating account:", error.message);
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

  return (
    <>
      <BackToHome />
      <div className={styles.dashboardContainer}>
        <div className={styles.sidebar}>
          <button
            className={
              activeSection === "status"
                ? styles.activeButton
                : styles.navButton
            }
            onClick={() => setActiveSection("status")}
          >
            Status
          </button>
          <button
            className={
              activeSection === "account"
                ? styles.activeButton
                : styles.navButton
            }
            onClick={() => setActiveSection("account")}
          >
            Account Settings
          </button>
        </div>
        <div className={styles.contentArea}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : activeSection === "status" ? (
            <div className={styles.reservationsContainer}>
              {reservations.length === 0 ? (
                <div>No reservations found</div>
              ) : (
                reservations.map((reservation) => (
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
                      {new Date(
                        reservation.reservation_date
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Duration:</strong> {reservation.duration} nights
                    </p>
                    <p>
                      <strong>Total Price:</strong> {reservation.total_price}{" "}
                      ETB
                    </p>
                    <p>
                      <strong>Status:</strong> {reservation.reservation_status}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {reservation.payment_status}
                    </p>
                    {reservation.reservation_status === "accepted" &&
                      reservation.payment_status === "unpaid" && (
                        <button
                          className={styles.payButton}
                          onClick={() =>
                            handlePayment(
                              reservation.total_price,
                              reservation.hotel_id
                            )
                          }
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
          ) : (
            <form className={styles.accountForm} onSubmit={handleAccountUpdate}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={accountData.name}
                  onChange={(e) =>
                    setAccountData({ ...accountData, name: e.target.value })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={accountData.email}
                  onChange={(e) =>
                    setAccountData({ ...accountData, email: e.target.value })
                  }
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phone_number"
                  value={accountData.phone_number}
                  onChange={(e) =>
                    setAccountData({
                      ...accountData,
                      phone_number: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                New Password:
                <input type="password" name="password" />
              </label>
              <label>
                ID Card Front Photo:
                <input type="file" name="id_card_front" />
              </label>
              <label>
                ID Card Back Photo:
                <input type="file" name="id_card_back" />
              </label>
              <button type="submit" className={styles.saveButton}>
                Update Account
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Reserv;
