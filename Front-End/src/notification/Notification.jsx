import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Notification.module.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/notification",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store JWT in local storage
            },
          }
        );
        setNotifications(response.data.notifications);
        setLoading(false);
      } catch (err) {
        setError("Failed to load notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.notificationContainer}>
      <h2>Your Notifications</h2>
      {notifications.length > 0 ? (
        <ul className={styles.notificationList}>
          {notifications.map((notification, index) => (
            <li key={index} className={styles.notificationItem}>
              <p>{notification.message}</p>
              <small>{notification.user_id}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default Notification;
