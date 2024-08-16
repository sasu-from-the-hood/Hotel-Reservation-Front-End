import "./roomManage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
const RoomManagement = () => {
  const rooms = [
    {
      number: "101",
      type: "Single",
      floor: "1st",
      facility: ["WiFi", "TV", "Air Conditioning", "Private Bathroom"],
      status: "Available",
    },
    {
      number: "102",
      type: "Double",
      floor: "1st",
      facility: ["WiFi", "TV", "Mini Bar", "Balcony"],
      status: "Booked",
    },
    {
      number: "201",
      type: "Suite",
      floor: "2nd",
      facility: ["WiFi", "TV", "Kitchenette", "Private Balcony"],
      status: "Reserved",
    },
    {
      number: "202",
      type: "Single",
      floor: "2nd",
      facility: ["WiFi", "TV", "Air Conditioning", "Room Service"],
      status: "Available",
    },
    {
      number: "301",
      type: "Double",
      floor: "3rd",
      facility: ["WiFi", "TV", "Mini Bar", "Jacuzzi"],
      status: "Booked",
    },
    {
      number: "302",
      type: "Suite",
      floor: "3rd",
      facility: ["WiFi", "TV", "Private Sauna", "Ocean View"],
      status: "Reserved",
    },
    {
      number: "401",
      type: "Single",
      floor: "4th",
      facility: ["WiFi", "TV", "Air Conditioning", "Room Service"],
      status: "Available",
    },
    {
      number: "402",
      type: "Double",
      floor: "4th",
      facility: ["WiFi", "TV", "Mini Bar", "Balcony"],
      status: "Booked",
    },
  ];

  return (
    <>
      <Header />
      <RoomStatus />
      <table className="table">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Room Floor</th>
            <th>Room Facility</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>#{room.number}</td>
              <td>{room.type}</td>
              <td>{room.floor}</td>
              <td>{room.facility.join(", ")}</td>
              <td>{room.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RoomManagement;

function Header() {
  return (
    <div className="header-container">
      <div className="header-container-left">
        <h2>Room Management</h2>
        <span>This is where you can Manage the rooms</span>
      </div>
      <div className="header-container-right">
        <FontAwesomeIcon icon={faBell} className="notification" />
        <div>AD</div>
      </div>
    </div>
  );
}
function RoomStatus() {
  return (
    <div className="room-status">
      <div className="filter-links">
        <NavLink className={({ isActive }) => (isActive ? "active" : "")}>
          All
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "")}>
          Available
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "")}>
          Booked
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "")}>
          Reserved
        </NavLink>
      </div>
      <div>
        <input
          className="room-search"
          type="text"
          placeholder="search for room and offer"
        />
      </div>
    </div>
  );
}
