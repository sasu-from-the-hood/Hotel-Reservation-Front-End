import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBell,
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faClock,
  faStar,
  faDoorOpen,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="bookings-container">
        <div className="bookings-container-left">
          <Analytics />
          <UpcomingBooking />
        </div>
        <div className="bookings-container-right">
          <Notification />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
function Header() {
  return (
    <div className="header-container">
      <div className="header-container-left">
        <h2>Dashboard</h2>
        <span>This is your Dashboard you can access anything</span>
      </div>
      <div className="header-container-right">
        <input
          className="room-search"
          type="text"
          placeholder="search for room and offer"
        />
        <FontAwesomeIcon icon={faBell} className="notification" />
        <div>AD</div>
      </div>
    </div>
  );
}
function Analytics() {
  return (
    <div className="analytics-grid">
      <div className="analytics-row">
        <FontAwesomeIcon icon={faBed} className="icon-bed" />
        <h4>205</h4>
        <span>Total Rooms</span>
      </div>
      <div className="analytics-row">
        <FontAwesomeIcon icon={faCheckCircle} className="icon-bed" />
        <h4>36</h4>
        <span>Booked rooms</span>
      </div>
      <div className="analytics-row">
        <FontAwesomeIcon icon={faDoorOpen} className="icon-bed" />
        <h4>20</h4>
        <span>Available rooms</span>
      </div>
      <div className="analytics-row">
        <FontAwesomeIcon icon={faClock} className="icon-bed" />
        <h4>23</h4>
        <span>Pending approvals</span>
      </div>
      <div className="analytics-row">
        <FontAwesomeIcon icon={faStar} className="icon-bed" />
        <h4>4</h4>
        <span>Average rating</span>
      </div>
    </div>
  );
}

function UpcomingBooking() {
  const data = [
    {
      name: "John Doe",
      requestDate: "2024-08-01",
      roomType: "Deluxe",
      availability: "Available",
      action: "View",
    },
    {
      name: "Jane Smith",
      requestDate: "2024-08-02",
      roomType: "Standard",
      availability: "Booked",
      action: "View",
    },
    {
      name: "Alice Johnson",
      requestDate: "2024-08-03",
      roomType: "Suite",
      availability: "Available",
      action: "View",
    },
    {
      name: "Bob Brown",
      requestDate: "2024-08-04",
      roomType: "Single",
      availability: "Available",
      action: "View",
    },
    {
      name: "Charlie Davis",
      requestDate: "2024-08-05",
      roomType: "Double",
      availability: "Booked",
      action: "View",
    },
  ];

  return (
    <>
      <h2 className="dash-title">Upcoming Booking</h2>
      <table className="guest-table">
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Request Date</th>
            <th>Room Type</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.requestDate}</td>
              <td>{item.roomType}</td>
              <td>{item.availability}</td>
              <td>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="icon-success"
                />
                <FontAwesomeIcon icon={faTimesCircle} className="icon-error" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Notification() {
  return (
    <div className="notification-container">
      <div className="notifcation-header">
        <p>Notifications</p>
        <FontAwesomeIcon icon={faEllipsisH} className="icon-error" />
      </div>
      <div className="notification-center">
        <div>
          <div className="main-notificaions">
            <FontAwesomeIcon icon={faExclamationTriangle} className="noti" />
            <div>
              <p>you have a new pending booking</p>
              <span>just now</span>
            </div>
          </div>

          <div className="main-notificaions">
            <FontAwesomeIcon icon={faExclamationTriangle} className="noti" />
            <div>
              <p>New User Regestered</p>
              <span>59 minute age</span>
            </div>
          </div>
          <div className="main-notificaions">
            <FontAwesomeIcon icon={faExclamationTriangle} className="noti" />
            <div>
              <p>you have a new pending booking</p>
              <span>one day ago</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="title-text">Activities</p>
        <div className="main-notificaions">
          <FontAwesomeIcon icon={faExclamationTriangle} className="noti" />
          <div>
            <p>you have declined the booking</p>
            <span>10 minutes ago</span>
          </div>
        </div>
        <div className="main-notificaions">
          <FontAwesomeIcon icon={faExclamationTriangle} className="noti" />
          <div>
            <p>you have a approved the booking</p>
            <span>56 minutes ago</span>
          </div>
        </div>
        <div className="main-notificaions">
          <FontAwesomeIcon icon={faExclamationTriangle} className="noti" />
          <div>
            <p>you have approved the booking</p>
            <span>one day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
