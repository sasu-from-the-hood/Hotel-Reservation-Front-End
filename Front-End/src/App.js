// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Landing Page/Home.jsx";
import Registration from "./components/Registration";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import HotelListing from "./Hotel Listing/HotelListing.jsx";
import Booking from "./Hotel Booking/Booking.jsx";
import HotelRoom from "./Hotel Room/HotelRoom.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/list-of-hotels" element={<HotelListing />} />
        <Route path="/admindashboard/*" element={<AdminDashboard />} />
        <Route path="/hotel-room/:id" element={<HotelRoom />} />
        <Route path="/Book/:id" element={<Booking />} />
      </Routes>
    </Router>
  );
};

export default App;
