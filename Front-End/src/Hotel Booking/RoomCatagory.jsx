import styles from "./RoomCatagory.module.css";
import { useNavigate } from "react-router-dom";

export default function RoomSuits({ rooms }) {
  const navigate = useNavigate();

  function handleCardClick(room) {
    navigate(`/hotel-room/${room.id}`, { state: { room } });
  }

  if (!rooms || rooms.length === 0) {
    return <div>No Room Catagory available</div>;
  }

  return (
    <section>
      <h1 className={styles.hotDealsTitle}>Room Catagory</h1>
      <div className={styles.hotDealsGrid}>
        {rooms.map((deal, i) => (
          <div
            key={i}
            className={styles.propertyCard}
            onClick={() => handleCardClick(deal)}
            role="button"
            aria-label={`View details for ${deal.type}`}
          >
            <img
              className="property-card-image"
              src={`/${deal.images[0]}`}
              alt={deal.type || "Property Image"}
            />
            <hr className="property-card-divider" />
            <div className={styles.propertyCardContent}>
              <span>{deal.type || "No Type"}</span>
              <span>{deal.address || "No Address"}</span>
              <span>{deal.details || "No Details"}</span>
            </div>
            <hr className="property-card-divider" />
          </div>
        ))}
      </div>
    </section>
  );
}
