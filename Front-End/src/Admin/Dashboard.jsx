import { useEffect, useState } from "react";
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
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className={styles.bookingsContainer}>
        <div className={styles.bookingsContainerLeft}>
          <Analytics />
          <UpcomingBooking />
        </div>
        <div className={styles.bookingsContainerRight}>
          <Notification />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainerLeft}>
        <h2>Dashboard</h2>
        <span>This is your Dashboard you can access anything</span>
      </div>
      <div className={styles.headerContainerRight}>
        <FontAwesomeIcon icon={faBell} className={styles.notification} />
        <div>AD</div>
      </div>
    </div>
  );
}

function Analytics() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/analytics")
      .then((response) => response.json())
      .then((data) => setAnalytics(data));
  }, []);

  return (
    <div className={styles.analyticsGrid}>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faBed}
          className={styles.iconBed}
          style={{ color: "#d49d44" }}
        />
        <h4>{analytics.totalRooms}</h4>
        <span>Total Rooms</span>
      </div>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={styles.iconBed}
          style={{ color: "#32CD32" }}
        />
        <h4>{analytics.bookedRooms}</h4>
        <span>Booked rooms</span>
      </div>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faDoorOpen}
          className={styles.iconBed}
          style={{ color: "blue" }}
        />
        <h4>{analytics.availableRooms}</h4>
        <span>Available rooms</span>
      </div>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faClock}
          className={styles.iconBed}
          style={{ color: "#d49d" }}
        />
        <h4>{analytics.pendingApprovals}</h4>
        <span>Pending approvals</span>
      </div>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faStar}
          className={styles.iconBed}
          style={{ color: "yellow" }}
        />
        <h4>{analytics.averageRating}</h4>
        <span>Average rating</span>
      </div>
    </div>
  );
}

function UpcomingBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/booking")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <>
      <h2 className={styles.dashTitle}>Upcoming Booking</h2>
      <table className={styles.guestTable}>
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
          {bookings.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.requestDate}</td>
              <td>{item.roomType}</td>
              <td>{item.availability}</td>
              <td>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={styles.iconSuccess}
                />
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className={styles.iconError}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/notifications") // Replace this with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setNotifications(data));
  }, []);

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notifcationHeader}>
        <p>Notifications</p>
        <FontAwesomeIcon icon={faEllipsisH} className={styles.iconError} />
      </div>
      <div className={styles.notificationCenter}>
        {notifications.map((notification) => (
          <div key={notification.id} className={styles.mainNotificaions}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className={styles.noti}
            />
            <div>
              <p>{notification.message}</p>
              <span>{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className={styles.titleText}>Activities</p>
        {notifications.map((activity) => (
          <div key={activity.id} className={styles.mainNotificaions}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className={styles.noti}
            />
            <div>
              <p>{activity.activity}</p>
              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
