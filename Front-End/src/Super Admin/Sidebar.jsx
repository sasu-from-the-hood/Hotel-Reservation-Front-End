import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronLeft,
  faChevronRight,
  faCog,
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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
