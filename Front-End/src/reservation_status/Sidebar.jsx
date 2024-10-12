import React, { useState } from "react";
import { FaBars, FaTimes, FaUser, FaCog } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import Status from "./Status";
import AccountSettings from "./AccountSettings";

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeSection, setActiveSection] = useState("status");

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${isMinimized ? styles.minimized : ""}`}
      >
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isMinimized ? <FaBars /> : <FaTimes />}
        </button>
        <div className={styles.sidebarContent}>
          <h2 className={styles.name}>John Doe</h2>
          <nav className={styles.nav}>
            <button
              className={`${styles.navButton} ${
                activeSection === "status" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("status")}
            >
              <FaUser />
              {!isMinimized && <span>Status</span>}
            </button>
            <button
              className={`${styles.navButton} ${
                activeSection === "account" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("account")}
            >
              <FaCog />
              {!isMinimized && <span>Account Settings</span>}
            </button>
          </nav>
        </div>
      </div>
      {/* <div className={styles.content}>
        {activeSection === "status" ? <Status /> : <AccountSettings />}
      </div> */}
    </div>
  );
};

export default Sidebar;
