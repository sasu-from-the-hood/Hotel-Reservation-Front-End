import styles from "./HotelRoom.module.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function HotelRoom() {
  const location = useLocation();
  const { room } = location.state || {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!room || !room.images || room.images.length === 0) {
    return <div>No room data available</div>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.hotelRoomContainer}>
      <div className={styles.hotelRoomLeftCol}>
        <img src={`/${room.images[currentImageIndex]}`} alt={room.name} />
        <button className={styles.nextBtn} onClick={handleNextImage}>
          <FontAwesomeIcon icon={faArrowRight} size="2x" />
        </button>
        <button className={styles.prevBtn} onClick={handlePrevImage}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </button>
        <div>
          <h1>{room.type}</h1>
          <p>
            {room.price} / <span>NIGHT</span>
          </p>
        </div>
      </div>

      <div className={styles.hotelRoomRightCol}>
        <form>
          <h1>Check Availability</h1>
          <input type="date" placeholder="Arrival Date" />
          <input type="date" placeholder="Departure Date" />
          <select>
            <option disabled selected>
              Adult
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select>
            <option disabled selected>
              Children
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <input
            type="submit"
            className={styles.submitBtn}
            value="RESERVE NOW"
          />
        </form>
      </div>
    </div>
  );
}
