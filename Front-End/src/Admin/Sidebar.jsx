// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBed,
  faClipboardList,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="icon">
        <img src="/img/nafLogo.png" alt="naf logo" />
      </div>
      <nav className="menu">
        <ul>
          <li>
            <NavLink
              to="/admindashboard"
              // style={({ isActive }) => ({
              //   color: isActive ? "#000" : "#fff",
              //   backgroundColor: isActive ? "#d49d44" : "transparent",
              //   padding: isActive ? "0.3rem 0.5rem" : null,
              //   borderRadius: isActive ? "20px" : null,
              // })}
            >
              <FontAwesomeIcon icon={faHome} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/room-management">
              <FontAwesomeIcon icon={faBed} /> Room Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/bookings">
              <FontAwesomeIcon icon={faClipboardList} /> Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/setting">
              <FontAwesomeIcon icon={faCog} /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
