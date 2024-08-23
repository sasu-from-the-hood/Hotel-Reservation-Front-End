import styles from "./HotelRoom.module.css";
import React from "react";
import { useLocation } from "react-router-dom";

export default function HotelRoom() {
  const location = useLocation();
  const { room } = location.state || {};

  if (!room) {
    return <div>No room data available</div>;
  }

  return (
    <div className={styles.hotelRoomContainer}>
      <div className={styles.hotelRoomLeftCol}>
        <img src={`/${room.image}`} alt={room.type} />
        <div>
          <h1>{room.category_name}</h1>
          <p>
            {room.price} ETB/ <span>NIGHT</span>
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
