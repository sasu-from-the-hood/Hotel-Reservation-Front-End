import { useEffect, useState, useRef } from "react";
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
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch dashboard info
    axios
      .get("http://localhost:5000/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setDashboardInfo(response.data);
      });
  }, []);


  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleViewDetail = (id) => {
    alert(id)
    axios
      .get(`http://localhost:5000/admin/reservation/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setSelectedReservation(response.data);
        setIsModalOpen(true);
      });
  };

  const handleAccept = () => {
    const id = selectedReservation.reservation_id; // Get the ID from the selectedReservation state
  
    setSelectedReservation((prev) => ({
      ...prev,
      // Optional: You can add any changes to the selectedReservation state here if needed
    }));
  
    axios
      .post(
        `http://localhost:5000/admin/reservation/${id}/action`,
        { action: "accept", reason: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        toast.success("Reservation accepted successfully");
        setIsModalOpen(false);
        setTimeout(() => {
          window.location.href = "/admindashboard";
        }, 1500);
      });
  };
  
  const handleDecline = () => {
    const id = selectedReservation.reservation_id; // Get the ID from the selectedReservation state
    const reason = prompt("Please enter the reason for declining:");
  
    if (!reason) {
      toast.error("Decline reason is required");
      return;
    }
  
    setSelectedReservation((prev) => ({
      ...prev,
      // Optional: You can add any changes to the selectedReservation state here if needed
    }));
  
    axios
      .post(
        `http://localhost:5000/admin/reservation/${id}/action`,
        { action: "decline", reason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        toast.success("Reservation declined successfully");
        setIsModalOpen(false);
        setTimeout(() => {
          window.location.href = "/admindashboard";
        }, 1500);
      });
  };
  return (
    <>
      <Header toggleNotifications={toggleNotifications} />
      <div className={styles.bookingsContainer}>
        <div className={styles.bookingsContainerLeft}>
          <Analytics dashboardInfo={dashboardInfo} />
          <UpcomingBooking
            reservations={dashboardInfo.pending_reservations || []}
            onViewDetail={handleViewDetail}
          />
        </div>
        <div className={styles.bookingsContainerRight}>
          {showNotifications && <Notification onClose={toggleNotifications} />}
        </div>
      </div>
<Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  className={styles.modalContent}
  overlayClassName={styles.modalOverlay}
>
  {selectedReservation && (
    <div>
      <h2 className={styles.modalHeader}>Reservation Details</h2>
      <p>Name: {selectedReservation.name}</p>
      <p>Email: {selectedReservation.email}</p>
      <p>Phone: {selectedReservation.phone_number}</p>
      <p>ID Card Front: <img src={`http://localhost:5000/uploads/${selectedReservation.id_card_photo_front}`} alt="ID" /></p>
      <p>ID Card Back: {selectedReservation.id_card_photo_back}
        <img src={`http://localhost:5000/uploads/${selectedReservation.id_card_photo_back}`}alt="ID"/></p>
      <button
        className={`${styles.modalButton} ${styles.modalButtonAccept}`}
        onClick={() => handleAccept(selectedReservation.id)}
      >
        Accept
      </button>
      <button
        className={`${styles.modalButton} ${styles.modalButtonDecline}`}
        onClick={() => handleDecline(selectedReservation.id)}
      >
        Decline
      </button>
    </div>
  )}
</Modal>

    </>
  );
};

export default Dashboard;

function Header({ toggleNotifications }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainerLeft}>
        <h2>Dashboard</h2>
        <span>This is your Dashboard; you can access anything</span>
      </div>
      <div className={styles.headerContainerRight}>
        <FontAwesomeIcon
          icon={faBell}
          className={styles.notification}
          onClick={toggleNotifications}
        />
        <div>AD</div>
      </div>
    </div>
  );
}

function Analytics({ dashboardInfo }) {

  return (
    <div className={styles.analyticsGrid}>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faBed}
          className={styles.iconBed}
          style={{ color: "#d49d44" }}
        />
        <h4>{dashboardInfo.stats?dashboardInfo.stats.total_rooms:0}</h4>
        <span>Total Rooms</span>
      </div>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={styles.iconBed}
          style={{ color: "#32CD32" }}
        />
        <h4>{dashboardInfo.stats?dashboardInfo.stats.booked_rooms:0}</h4>
        <span>Booked Rooms</span>
      </div>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faDoorOpen}
          className={styles.iconBed}
          style={{ color: "blue" }}
        />
        <h4>{dashboardInfo.stats?dashboardInfo.stats.available_rooms:0}</h4>
        <span>Available Rooms</span>
      </div>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faClock}
          className={styles.iconBed}
          style={{ color: "#d49d" }}
        />
        <h4>{dashboardInfo.stats?dashboardInfo.stats.pending_reservations_count:0}</h4>
        <span>Pending Approvals</span>
      </div>
      <div className={styles.analyticsRow}>
        <FontAwesomeIcon
          icon={faStar}
          className={styles.iconBed}
          style={{ color: "yellow" }}
        />
        <h4>{dashboardInfo.stats?dashboardInfo.stats.averageRating:0}</h4>
        <span>Average Rating</span>
      </div>
    </div>
  );
}

function UpcomingBooking({ reservations, onViewDetail }) {
  if (!reservations || reservations.length === 0) {
    return <p>No reservations found.</p>;
  }

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
          {reservations.map((item) => (
            <tr key={item.id}>
              <td>{item.guest_name}</td>
              <td>{item.reservation_date}</td>
              <td>{item.category}</td>
              <td>{item.availability}</td>
              <td>
                <button onClick={() => onViewDetail(item.id)}>View Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}



function Notification({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/notification", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setNotifications(response.data.noNotifications || []))
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      });

    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.notificationContainer} ref={notificationRef}>
      <div className={styles.notifcationHeader}>
        <p>Notifications</p>
        <FontAwesomeIcon icon={faEllipsisH} className={styles.iconError} />
      </div>
      <div className={styles.notificationCenter}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
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
          ))
        ) : (
          <p className={styles.noNotification}>No new notifications</p>
        )}
      </div>
    </div>
  );
}
