import "./roomManage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
const Bookings = () => {
  const bookings = [
    {
      id: "B001",
      guestName: "John Doe",
      roomNumber: "101",
      roomType: "Single",
      checkIn: "2024-08-01",
      checkOut: "2024-08-05",
      status: "Checked-in",
    },
    {
      id: "B002",
      guestName: "Jane Smith",
      roomNumber: "102",
      roomType: "Double",
      checkIn: "2024-08-03",
      checkOut: "2024-08-06",
      status: "Checked-out",
    },
    {
      id: "B003",
      guestName: "David Brown",
      roomNumber: "201",
      roomType: "Suite",
      checkIn: "2024-08-04",
      checkOut: "2024-08-08",
      status: "Checked-in",
    },
    {
      id: "B004",
      guestName: "Emily White",
      roomNumber: "202",
      roomType: "Single",
      checkIn: "2024-08-02",
      checkOut: "2024-08-06",
      status: "Checked-out",
    },
    {
      id: "B005",
      guestName: "Michael Green",
      roomNumber: "301",
      roomType: "Double",
      checkIn: "2024-08-05",
      checkOut: "2024-08-10",
      status: "Checked-in",
    },
    {
      id: "B006",
      guestName: "Sarah Black",
      roomNumber: "302",
      roomType: "Suite",
      checkIn: "2024-08-06",
      checkOut: "2024-08-11",
      status: "Checked-in",
    },
    {
      id: "B007",
      guestName: "James Gray",
      roomNumber: "401",
      roomType: "Single",
      checkIn: "2024-08-07",
      checkOut: "2024-08-09",
      status: "Checked-out",
    },
    {
      id: "B008",
      guestName: "Laura Blue",
      roomNumber: "402",
      roomType: "Double",
      checkIn: "2024-08-08",
      checkOut: "2024-08-12",
      status: "Checked-in",
    },
    {
      id: "B009",
      guestName: "Robert Gold",
      roomNumber: "101",
      roomType: "Single",
      checkIn: "2024-08-09",
      checkOut: "2024-08-13",
      status: "Checked-in",
    },
    {
      id: "B010",
      guestName: "Linda Silver",
      roomNumber: "102",
      roomType: "Double",
      checkIn: "2024-08-10",
      checkOut: "2024-08-14",
      status: "Checked-out",
    },
  ];

  return (
    <>
      <Header />
      <input
        className="room-search"
        type="text"
        placeholder="search for room and offer"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Guest Name</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.id}</td>
              <td>{booking.guestName}</td>
              <td>{booking.roomNumber}</td>
              <td>{booking.roomType}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.status}</td>
              <td>
                <button className="action-button">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Bookings;

function Header() {
  return (
    <div className="header-container">
      <div className="header-container-left">
        <h2>Bookings</h2>
        <span>This is where you can see the bookings</span>
      </div>
      <div className="header-container-right">
        <FontAwesomeIcon icon={faBell} className="notification" />
        <div>AD</div>
      </div>
    </div>
  );
}
