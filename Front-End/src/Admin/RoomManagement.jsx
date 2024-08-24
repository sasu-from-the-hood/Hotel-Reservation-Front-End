import React, { useEffect, useState } from "react";
import styles from "./RoomManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All"); // State to keep track of filter

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/rooms");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on the selected filter
  const filteredRooms = rooms.filter((room) => {
    if (filter === "All") return true;
    return room.status === filter;
  });

  return (
    <>
      <Header />
      <RoomStatus onFilterChange={setFilter} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Room Floor</th>
            <th>Room Facility</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room, index) => (
            <tr key={index}>
              <td>#{room.number}</td>
              <td>{room.type}</td>
              <td>{room.floor}</td>
              <td>{room.facility.join(", ")}</td>
              <td>{room.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RoomManagement;

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainerLeft}>
        <h2>Room Management</h2>
        <span>This is where you can manage the rooms</span>
      </div>
      <div className={styles.headerContainerRight}>
        <FontAwesomeIcon icon={faBell} className={styles.notification} />
        <div>AD</div>
      </div>
    </div>
  );
}

function RoomStatus({ onFilterChange }) {
  return (
    <div className="room-status">
      <div>
        <input
          className={styles.roomSearch}
          type="text"
          placeholder="Search for room and offer"
        />
      </div>
      <nav className={styles.filterLinks}>
        <NavLink to="#" onClick={() => onFilterChange("All")}>
          All
        </NavLink>
        <NavLink to="#" onClick={() => onFilterChange("Available")}>
          Available
        </NavLink>
        <NavLink to="#" onClick={() => onFilterChange("Booked")}>
          Booked
        </NavLink>
        <NavLink to="#" onClick={() => onFilterChange("Reserved")}>
          Reserved
        </NavLink>
      </nav>
    </div>
  );
}
