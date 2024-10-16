import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Landing Page/Home.jsx";
import Registration from "./components/Registration.js";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import Booking from "./Hotel Booking/Booking.jsx";
import HotelListing from "./Hotel Listing/HotelListing.jsx";
import HotelRoom from "./Hotel Room/HotelRoom.jsx";
import Reserv from "./reservation_status/Reserv.jsx";
import SuperAdmin from "./Super Admin/SuperAdmin.jsx";
import Notification from "./Landing Page/Notification.jsx";
import ProtectedRoute from "./protectedRoutes.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute allowedTypes="user" />}>
          <Route path="/notification" element={<Notification />} />
        </Route>

        <Route path="/registration" element={<Registration />} />
        <Route path="/list-of-hotels" element={<HotelListing />} />
        <Route path="/hotel-room/:id" element={<HotelRoom />} />
        <Route path="/Book/:id" element={<Booking />} />
        <Route element={<ProtectedRoute allowedTypes="user" />}>
          <Route path="/reservations" element={<Reserv />} />
        </Route>
        <Route element={<ProtectedRoute allowedTypes="admin" />}>
          <Route path="/admindashboard/*" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedTypes="superadmin" />}>
          <Route path="/superadmin/*" element={<SuperAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
