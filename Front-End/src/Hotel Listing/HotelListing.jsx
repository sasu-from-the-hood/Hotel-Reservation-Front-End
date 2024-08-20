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
} from "@fortawesome/free-solid-svg-icons";

export default function HotelListing() {
  const [hotels, setHotels] = useState([]);
  const [defaultHotels, setDefaultHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
        setDefaultHotels(data); // Store the original hotel order
      })
      .catch((error) => console.error("Error fetching hotels:", error));
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
        a.name.localeCompare(b.name)
      );
      setHotels(sortedHotels);
    }
    setIsSorted(!isSorted);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <FontAwesomeIcon icon={faArrowDownAZ} />
          </button>
        </div>
        <div className={styles.hotelListGrid}>
          {filteredHotels.map((hotel) => (
            <div className={styles.hotel} key={hotel.id}>
              <div className={styles.hotelService}>
                <img src={hotel.image} alt={hotel.name} />
                <div>
                  <h4>{hotel.name}</h4>
                  <span>
                    <span>
                      <FontAwesomeIcon icon={faWifi} className="icons" />
                      <FontAwesomeIcon icon={faDumbbell} className="icons" />
                      <FontAwesomeIcon icon={faWaterLadder} className="icons" />
                      <FontAwesomeIcon icon={faBurger} className="icons" />
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.hotelServicesCon}>
                <hr className={styles.line} />
                <div className={styles.hotelServices}>
                  {hotel.rooms.map((room, index) => (
                    <>
                      <div key={index}>
                        <span>{room.type}</span>
                        <span>{room.price}</span>
                      </div>
                      <div>
                        {}
                        <span>{room.loc}</span>
                        <a
                          href={room.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {room.place}
                        </a>
                      </div>
                    </>
                  ))}
                </div>
                <hr className={styles.line} />
                <div className={styles.btn}>
                  <button onClick={() => handleViewDetail(hotel.id)}>
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
