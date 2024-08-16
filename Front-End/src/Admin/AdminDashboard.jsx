import "./admin.css";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import RoomManagement from "./RoomManagement";
import Bookings from "./Bookings";
import Setting from "./Setting";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="room-management" element={<RoomManagement />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
