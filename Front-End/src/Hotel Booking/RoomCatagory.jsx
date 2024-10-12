import React from "react";
import styles from "./RoomCatagory.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faDollarSign,
  faHotel,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
export default function RoomSuits({ categories }) {
  const navigate = useNavigate();

  function handleCardClick(category) {
    navigate(`/hotel-room/${category.category_id}`, {
      state: { room: category },
    });
  }

  if (!Array.isArray(categories)) {
    console.error("Expected categories to be an array but got:", categories);
    return <div>Invalid data format</div>;
  }

  if (categories.length === 0) {
    return <div>No Room Category available</div>;
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.hotDealsTitle}>Room Category</h1>
      <div className={styles.hotDealsGrid}>
        {categories.map((category) => (
          <div
            key={category.category_id}
            className={styles.propertyCard}
            role="button"
            aria-label={`View details for ${category.category_name}`}
          >
            <img
              className="property-card-image"
              src={`http://localhost:5000/hotel_image/${
                category.photo || "default.jpg"
              }`} // URL path to the image
              alt={category.category_name || "Category Image"}
            />
            <hr className={styles.propertyCardDivider} />
            <div className={styles.propertyCardContent}>
              <div>
                <div>
                  <FontAwesomeIcon icon={faBed} color="#8B4513" /> Room Type:
                </div>
                <div>{category.category_name}</div>
              </div>
              <div>
                <div>
                  <FontAwesomeIcon icon={faDollarSign} color="#28A745" /> Price:
                </div>
                <div>{category.price.toFixed(2)} ETB</div>
              </div>
              <div>
                <div>
                  <FontAwesomeIcon icon={faHotel} color="#6C757D" /> Total
                  Rooms:
                </div>
                <div>{category.total_rooms}</div>
              </div>
              <div>
                <div>
                  <FontAwesomeIcon icon={faCheck} color="#007BFF" /> Available
                  Rooms:
                </div>
                <div>{category.available_rooms}</div>
              </div>
            </div>
            <hr className={styles.propertyCardDivider} />
            <div className={styles.bookNow}>
              <button onClick={() => handleCardClick(category)}>
                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
