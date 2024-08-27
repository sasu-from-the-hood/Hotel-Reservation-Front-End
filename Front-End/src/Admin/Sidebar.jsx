import React from "react";
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

const Sidebar = ({ onClick, isSidebarOpen }) => {
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
          <li>
            <NavLink to="x">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>{isSidebarOpen && "Log out"}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
