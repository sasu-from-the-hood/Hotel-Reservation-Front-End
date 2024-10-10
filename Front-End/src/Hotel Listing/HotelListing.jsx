import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HotelListing.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faWifi,
  faDumbbell,
  faWaterLadder,
  faBurger,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../components/LoadingPage";

export default function HotelListing() {
  const [hotels, setHotels] = useState([]);
  const [defaultHotels, setDefaultHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/user/hotel")
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
        setDefaultHotels(data);
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

  const handleSort = () => {
    if (isSorted) {
      setHotels(defaultHotels);
    } else {
      // Sort alphabetically A-Z
      const sortedHotels = [...hotels].sort((a, b) =>
        a.hotel_name.localeCompare(b.hotel_name)
      );
      setHotels(sortedHotels);
    }
    setIsSorted(!isSorted);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.hotel_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <div className={styles.hotelListContainer}>
        <h1>Hotel Listing</h1>
        <div>
          <input
            className={styles.search}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.sortBtn} onClick={handleSort}>
            <FontAwesomeIcon icon={faArrowDownAZ} className={styles.icon} />
          </button>
        </div>
        <div className={styles.hotelListGrid}>
          {filteredHotels.map((hotel) => (
            <div className={styles.hotel} key={hotel.id}>
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
