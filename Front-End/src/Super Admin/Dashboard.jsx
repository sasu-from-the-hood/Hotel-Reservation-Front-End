import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faUserShield,
  faBed,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.css";
import axios from "axios";

const Dashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState({
    hotelCount: 0,
    adminCount: 0,
    roomCount: 0,
    userCount: 0,
    userRegistrationByMonth: {},
  });

  useEffect(() => {
    // Fetch dashboard info
    axios
      .get("http://localhost:5000/superadmin/statistics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setDashboardInfo(response.data);
      });
  }, []);

  const hotelRegistrationData = dashboardInfo.userRegistrationByMonth;

  // Function to generate user growth data across years
  const generateUserGrowthData = () => {
    let cumulativeUsers = 0;
    const growthData = {};

    Object.entries(hotelRegistrationData).forEach(([year, data]) => {
      growthData[year] = data.map((entry) => {
        cumulativeUsers += entry.userCount;
        return {
          month: entry.month,
          users: cumulativeUsers,
        };
      });
    });

    return growthData;
  };

  const userGrowthData = generateUserGrowthData();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Super Admin Dashboard</h1>

      <div className={styles.analyticsGrid}>
        <div className={styles.analyticsRow}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{ color: "#3498db" }}
            icon={faHotel}
          />
          <h4>{dashboardInfo.hotelCount}</h4>
          <span>Total Hotels</span>
        </div>
        <div className={styles.analyticsRow}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{ color: "#e74c3c" }}
            icon={faUserShield}
          />
          <h4>{dashboardInfo.adminCount}</h4>
          <span>Number of Admins</span>
        </div>
        <div className={styles.analyticsRow}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{ color: "#2ecc71" }}
            icon={faBed}
          />
          <h4>{dashboardInfo.roomCount}</h4>
          <span>Number of Rooms</span>
        </div>
        <div className={styles.analyticsRow}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{ color: "#f1c40f" }}
            icon={faUsers}
          />
          <h4>{dashboardInfo.userCount}</h4>
          <span>Number of Users</span>
        </div>
      </div>

      <div className={styles.charts}>
        {/* Bar Chart: Hotels Registered Per Month */}
        {Object.entries(hotelRegistrationData).map(([year, data]) => (
          <div key={year} className={styles.chartWrapper}>
            <h3>{year} User Registrations</h3>
            <BarChart width={500} height={300} data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="userCount" fill="#82ca9d" />
            </BarChart>
          </div>
        ))}
      </div>

      <div className={styles.charts}>
        {/* Line Charts: User Growth for Each Year */}
        {Object.entries(userGrowthData).map(([year, data]) => (
          <div key={year} className={styles.chartWrapper}>
            <h3>{year} User Growth</h3>
            <LineChart width={650} height={350} data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
            </LineChart>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
