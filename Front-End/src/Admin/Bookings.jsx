import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "./Bookings.module.css";

const Bookings = () => {
  const [reservations, setReservations] = useState({
    online_reservations: { accepted: [], checkedout: [] },
    manual_reservations: { accepted: [], checkedout: [] },
  });
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/reservation", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setReservations(data);

      // Combine and process reservations
      const processedReservations = [
        ...data.online_reservations.accepted.map((reservation) => ({
          ...reservation,
          reservation_type: "online", // Ensure type is set
        })),
        ...data.online_reservations.checkedout.map((reservation) => ({
          ...reservation,
          reservation_type: "online", // Ensure type is set
        })),
        ...data.manual_reservations.accepted.map((reservation) => ({
          ...reservation,
          reservation_type: "manual",
          payment_status: "Paid Manually",
        })),
        ...data.manual_reservations.checkedout.map((reservation) => ({
          ...reservation,
          reservation_type: "manual",
          payment_status: "Paid Manually",
        })),
      ];

      // Sort reservations: non-checked-out first
      const sortedReservations = processedReservations.sort((a, b) => {
        if (
          a.reservation_status === "checkedout" &&
          b.reservation_status !== "checkedout"
        ) {
          return 1;
        } else if (
          a.reservation_status !== "checkedout" &&
          b.reservation_status === "checkedout"
        ) {
          return -1;
        }
        return 0;
      });

      setFilteredReservations(sortedReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleFilter = (type) => {
    if (
      !reservations.online_reservations ||
      !reservations.manual_reservations
    ) {
      console.error("Reservations data is not properly loaded");
      return;
    }

    let filteredData = [];

    if (type === "online") {
      filteredData = [
        ...reservations.online_reservations.accepted.map((reservation) => ({
          ...reservation,
          reservation_type: "online", // Ensure type is set
        })),
        ...reservations.online_reservations.checkedout.map((reservation) => ({
          ...reservation,
          reservation_type: "online", // Ensure type is set
        })),
      ];
    } else if (type === "manual") {
      filteredData = [
        ...reservations.manual_reservations.accepted.map((reservation) => ({
          ...reservation,
          reservation_type: "manual",
        })),
        ...reservations.manual_reservations.checkedout.map((reservation) => ({
          ...reservation,
          reservation_type: "manual",
        })),
      ];
    } else {
      filteredData = [
        ...reservations.online_reservations.accepted.map((reservation) => ({
          ...reservation,
          reservation_type: "online", // Ensure type is set
        })),
        ...reservations.online_reservations.checkedout.map((reservation) => ({
          ...reservation,
          reservation_type: "online", // Ensure type is set
        })),
        ...reservations.manual_reservations.accepted.map((reservation) => ({
          ...reservation,
          reservation_type: "manual",
        })),
        ...reservations.manual_reservations.checkedout.map((reservation) => ({
          ...reservation,
          reservation_type: "manual",
        })),
      ];
    }

    // Sort reservations: non-checked-out first
    const sortedFilteredData = filteredData.sort((a, b) => {
      if (
        a.reservation_status === "checkedout" &&
        b.reservation_status !== "checkedout"
      ) {
        return 1;
      } else if (
        a.reservation_status !== "checkedout" &&
        b.reservation_status === "checkedout"
      ) {
        return -1;
      }
      return 0;
    });

    setFilteredReservations(sortedFilteredData);
  };

  const handleCheckout = async (reservationId, reservationType) => {
    try {
      console.log("Checkout triggered for:", reservationId, reservationType); // Debugging line
      const response = await fetch(
        "http://localhost:5000/admin/reservation/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            reservation_id: reservationId,
            reservation_type: reservationType,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("Checkout successful:", data);
        fetchReservations(); // Refresh the reservations after successful checkout
      } else {
        console.error("Checkout error:", data);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const renderReservations = filteredReservations.filter(
    (reservation) =>
      (reservation?.user_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (String(reservation?.room_number) || "").includes(searchTerm)
  );

  return (
    <>
      <Header />
      <div className={styles.filterButtons}>
        <button onClick={() => handleFilter("all")}>All Reservations</button>
        <button onClick={() => handleFilter("online")}>
          Online Reservations
        </button>
        <button onClick={() => handleFilter("manual")}>
          Manual Reservations
        </button>
      </div>
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
            <th>Reservation ID</th>
            <th>Guest Name</th>
            <th>Room Number</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderReservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.reservation_id}</td>
              <td>{reservation.user_name}</td>
              <td>{reservation.room_number}</td>
              <td>
                {new Date(reservation.reservation_date).toLocaleDateString()}
              </td>
              <td>
                {new Date(reservation.checkout_date).toLocaleDateString()}
              </td>
              <td>{reservation.reservation_status}</td>
              <td>{reservation.payment_status || "N/A"}</td>
              <td>
                {reservation.reservation_status !== "checkedout" && (
                  <button
                    className={styles.actionButton}
                    onClick={() =>
                      handleCheckout(
                        reservation.reservation_id,
                        reservation.reservation_type
                      )
                    }
                  >
                    Check Out
                  </button>
                )}
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
