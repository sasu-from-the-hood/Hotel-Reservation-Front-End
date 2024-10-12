import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import the jwt-decode library
import { FaBars, FaTimes, FaUser, FaCog } from "react-icons/fa";
import styles from "./Sidebar.module.css"; // Make sure CSS changes are applied


const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [username, setUsername] = useState("John Doe"); // Define username state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Assuming the username is stored in the 'name' field of the token payload
        setUsername(decoded.name || "John Doe"); // Replace with the actual key for the username
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsMinimized((prev) => !prev); // Toggle sidebar state
  };

  return (
    <div className={styles.container}>
      {/* Sidebar Section */}
      <div className={`${styles.sidebar} ${isMinimized ? styles.minimized : ""}`}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isMinimized ? <FaBars /> : <FaTimes />}
        </button>

        <div className={styles.sidebarContent}>
          {/* Sidebar Header (Name) */}
          <h2 className={`${styles.name} ${isMinimized ? styles.hide : ""}`}>
            {username} {/* Display the username from the token */}
          </h2>

          {/* Navigation Buttons */}
          <nav className={styles.nav}>
            {/* Status Button */}
            <button
              className={`${styles.navButton} ${activeSection === "status" ? styles.active : ""}`}
              onClick={() => setActiveSection("status")}
            >
              <FaUser className={styles.icon} />
              {!isMinimized && <span>Status</span>}
            </button>

            {/* Account Settings Button */}
            <button
              className={`${styles.navButton} ${activeSection === "account" ? styles.active : ""}`}
              onClick={() => setActiveSection("account")}
            >
              <FaCog className={styles.icon} />
              {!isMinimized && <span>Account Settings</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Content Section */}
      {/* <div className={styles.content}>
        {activeSection === "status" ? <Status /> : <AccountSettings />}
      </div> */}
    </div>
  );
};

export default Sidebar;
