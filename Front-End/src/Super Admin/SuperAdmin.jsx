import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import ManageHotel from "./Manage Hotel/ManageHotels.jsx";
import styles from "./SuperAdmin.module.css";
import { useState } from "react";

const SuperAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div
        className={`${styles.content} ${
          isSidebarOpen ? styles.contentOpen : styles.contentClosed
        }`}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="ManageHotel" element={<ManageHotel />} />
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
