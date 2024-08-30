import React from "react";
import styles from "./RoomCatagory.module.css";
import { useNavigate } from "react-router-dom";

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
    <section>
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
              alt={category.category_name || "Category Image"} // Alt text for accessibility
            />
            <hr className="property-card-divider" />
            <div className={styles.propertyCardContent}>
              <div>
                <span>{category.category_name}</span>
                <span>Price: {category.price.toFixed(2)} ETB</span>
              </div>
              <div>
                <span>Total Rooms: {category.total_rooms}</span>
                <span>Available Rooms: {category.available_rooms}</span>
              </div>
            </div>
            <hr className="property-card-divider" />
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
