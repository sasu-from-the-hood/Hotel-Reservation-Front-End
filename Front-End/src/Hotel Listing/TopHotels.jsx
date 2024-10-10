import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HotelListing.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faDumbbell,
  faWaterLadder,
  faBurger,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../components/LoadingPage";

export default function HotelListing() {
  const [topHotels, setTopHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/user/hotel")
      .then((response) => response.json())
      .then((data) => {
        // Sort hotels by rating in descending order
        const sortedHotels = data.sort((a, b) => b.rating - a.rating);
        // Take the top 3 hotels
        const top3Hotels = sortedHotels.slice(0, 3);
        setTopHotels(top3Hotels);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      });
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/Book/${id}`);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <div className={styles.hotelListContainer}>
        <h1>Top 3 Rated Hotels</h1>
        <div className={styles.hotelListGrid}>
          {topHotels.map((hotel) => (
            <div className={styles.hotel} key={hotel.hotel_id}>
              <div className={styles.hotelService}>
                <img
                  src={`http://localhost:5000/hotel_image/${
                    hotel.photo || "default.jpg"
                  }`}
                  alt={hotel.hotel_name}
                />
                <p>
                  {typeof hotel.rating === "number"
                    ? hotel.rating.toFixed(1)
                    : "N/A"}
                  <FontAwesomeIcon icon={faStar} />
                </p>
                <div>
                  <h4>{hotel.hotel_name}</h4>
                  <span>
                    <span>
                      <FontAwesomeIcon icon={faWifi} className={styles.icons} />
                      <FontAwesomeIcon
                        icon={faDumbbell}
                        className={styles.icons}
                      />
                      <FontAwesomeIcon
                        icon={faWaterLadder}
                        className={styles.icons}
                      />
                      <FontAwesomeIcon
                        icon={faBurger}
                        className={styles.icons}
                      />
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.hotelServicesCon}>
                <hr className={styles.line} />
                <div className={styles.hotelServices}>
                  <div>
                    <span>Location</span>
                    <a
                      href={hotel.location}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      click here
                    </a>
                  </div>
                </div>
                <hr className={styles.line} />
                <div className={styles.btn}>
                  <button onClick={() => handleViewDetail(hotel.hotel_id)}>
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
