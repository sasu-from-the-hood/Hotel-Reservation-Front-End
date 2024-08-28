import React, { useEffect, useState } from "react";
import styles from "./RoomManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Get the token from local storage or other secure storage
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/admin/room", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on the selected filter and search query (room number only)
  const filteredRooms = rooms.filter((room) => {
    // Check if room number matches the search query
    const matchesSearch = room.room_number.toString().includes(searchQuery);

    // Check room status based on filter
    const matchesFilter =
      filter === "All" ||
      (filter === "Available" && room.availability === 0) ||
      (filter === "Reserved" && room.availability === 1);

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Header />
      <RoomStatus
        onFilterChange={setFilter}
        onSearchChange={setSearchQuery} // Pass down the search handler
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Room Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room, index) => (
            <tr key={index}>
              <td>#{room.room_number}</td>
              <td>{room.category_name}</td>
              <td>{room.price}</td>
              {/* Display 'Reserved' if availability is 1, otherwise 'Available' */}
              <td>{room.availability === 1 ? "Reserved" : "Available"}</td>
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
      </div>
    </div>
  );
}

function RoomStatus({ onFilterChange, onSearchChange }) {
  return (
    <div className="room-status">
      <div>
        <input
          className={styles.roomSearch}
          type="text"
          placeholder="Search by room number"
          onChange={(e) => onSearchChange(e.target.value)} // Handle search input dynamically
        />
      </div>
      <nav className={styles.filterLinks}>
        <NavLink to="#" onClick={() => onFilterChange("All")}>
          All
        </NavLink>
        <NavLink to="#" onClick={() => onFilterChange("Available")}>
          Available
        </NavLink>
        <NavLink to="#" onClick={() => onFilterChange("Reserved")}>
          Reserved
        </NavLink>
      </nav>
    </div>
  );
}
