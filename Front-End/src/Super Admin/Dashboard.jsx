import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
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

const Dashboard = () => {
  const [hotelCount, setHotelCount] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/superadmin/statistics")
      .then((response) => response.json())
      .then((data) => {
        setHotelCount(data.hotelCount);
        setAdmins(data.adminCount);
        setRooms(data.roomCount);
        setUsers(data.userCount);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const userGrowthData = [
    { date: "2024-08-01", users: 50 },
    { date: "2024-08-08", users: 100 },
    { date: "2024-08-15", users: 150 },
    { date: "2024-08-22", users: 175 },
    { date: "2024-08-29", users: 200 },
  ];

  // Simulate month-to-month data for hotel registrations
  const hotelRegistrationData = [
    { month: "Jan", HotelRegistered: 2 },
    { month: "Feb", HotelRegistered: 3 },
    { month: "Mar", HotelRegistered: 4 },
    { month: "Apr", HotelRegistered: 1 },
    { month: "May", HotelRegistered: 2 },
    { month: "Jun", HotelRegistered: 3 },
    { month: "Jul", HotelRegistered: 4 },
    { month: "Aug", HotelRegistered: 6 },
  ];

  // Data for the pie chart
  // const pieChartData = [
  //   { name: "Total Hotels", value: hotelCount },
  //   { name: "Number of Admins", value: admins },
  //   { name: "Number of Rooms", value: rooms },
  //   { name: "Number of Users", value: users },
  // ];

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          <h4>{hotelCount}</h4>
          <span>Total Hotels</span>
        </div>
        <div className={styles.analyticsRow}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{ color: "#e74c3c" }}
            icon={faUserShield}
          />
          <h4>{admins}</h4>
          <span>Number of Admins</span>
        </div>
        <div className={styles.analyticsRow}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{ color: "#2ecc71" }}
            icon={faBed}
          />
          <h4>{rooms}</h4>
          <span>Number of Rooms</span>
        </div>
        <div className={styles.analyticsRow}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{ color: "#f1c40f" }}
            icon={faUsers}
          />
          <h4>{users}</h4>
          <span>Number of Users</span>
        </div>
      </div>
      <div className={styles.charts}>
        {/* Bar Chart: Hotels Registered Per Month */}
        <BarChart width={500} height={300} data={hotelRegistrationData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="HotelRegistered" fill="#82ca9d" />
        </BarChart>
        {/* Pie Chart: Distribution of Stats */}
        {/* <PieChart width={600} height={400}>
          <Pie
            data={pieChartData}
            cx={240}
            cy={200}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart> */}
        {/* Graph Section: User Growth */}
        <LineChart width={650} height={350} data={userGrowthData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;
