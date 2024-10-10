import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBed,
  faClipboardList,
  faCog,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt,
  faCalendarCheck,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";
import { useAuth } from "../authcontext";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal

const Sidebar = ({ onClick, isSidebarOpen }) => {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers for opening and closing the modal
  const handleLogoutClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    logout(); // Call the logout function from context
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
            <NavLink to="/admindashboard">
              <FontAwesomeIcon icon={faHome} />
              <span>{isSidebarOpen && "Dashboard"}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/room-management">
              <FontAwesomeIcon icon={faBed} />
              <span>{isSidebarOpen && "Room Management"}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/bookings">
              <FontAwesomeIcon icon={faClipboardList} />
              <span>{isSidebarOpen && "Bookings"}</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admindashboard/HotelSetting">
              <FontAwesomeIcon icon={faCog} />
              <span>{isSidebarOpen && "Hotel Setting"}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/ManualReservation">
              <FontAwesomeIcon icon={faCalendarCheck} />
              <span>{isSidebarOpen && "Manual Reservation"}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/ChangePassword">
              <FontAwesomeIcon icon={faKey} />
              <span>{isSidebarOpen && "Change Password"}</span>
            </NavLink>
          </li>
          <li onClick={handleLogoutClick} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>{isSidebarOpen && "Log out"}</span>
          </li>
        </ul>
      </nav>

      {/* Confirmation Modal for Logout */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Sidebar;
