import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import RoomManagement from "./RoomManagement";
import Bookings from "./Bookings";
import ChangePassword from "./ChangePassword";
import HotelSetting from "./Hotel Setting/HotelSetting";
import ManualReservation from "./ManualReservation";
import styles from "./AdminDashboard.module.css";
import { useState } from "react";

const AdminDashboard = () => {
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
          <Route path="room-management" element={<RoomManagement />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="ChangePassword" element={<ChangePassword />} />
          <Route path="HotelSetting" element={<HotelSetting />} />
          <Route path="ManualReservation" element={<ManualReservation />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
