import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronLeft,
  faChevronRight,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";
import { useAuth } from "../authcontext";
import ConfirmationModal from "../Admin/ConfirmationModal"; // Import the ConfirmationModal component

const Sidebar = ({ onClick, isSidebarOpen }) => {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to handle logout confirmation
  const handleConfirmLogout = () => {
    logout(); // Perform the logout
    setIsModalOpen(false); // Close the modal after confirming
  };

  return (
    <div
      className={`${styles.sidebar} ${
        isSidebarOpen ? styles.open : styles.closed
      }`}
    >
      <FontAwesomeIcon
        onClick={onClick}
        icon={isSidebarOpen ? faChevronLeft : faChevronRight}
        className={styles.sidebarIcon}
      />
      <div
        className={`${styles.icon} ${
          isSidebarOpen ? styles.iconOpen : styles.iconClosed
        }`}
      >
        <img src="/img/nafLogo.png" alt="naf logo" />
      </div>
      <nav
        className={`${styles.menu} ${
          isSidebarOpen ? styles.menuOpen : styles.menuClosed
        }`}
      >
        <ul>
          <li>
            <NavLink to="/SuperAdmin">
              <FontAwesomeIcon icon={faHome} />
              <span>{isSidebarOpen && "Dashboard"}</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/SuperAdmin/ManageHotel">
              <FontAwesomeIcon icon={faCog} />
              <span>{isSidebarOpen && "Manage Hotel"}</span>
            </NavLink>
          </li>
          <li
            onClick={() => setIsModalOpen(true)} // Open the confirmation modal on click
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>{isSidebarOpen && "Log out"}</span>
          </li>
        </ul>
      </nav>

      {/* Render the ConfirmationModal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Sidebar;
