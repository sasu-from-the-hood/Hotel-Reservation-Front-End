import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoomSuits({ rooms }) {
  const navigate = useNavigate();

  function handleCardClick(room) {
    navigate(`/hotel-room/${room.id}`, { state: { room } });
  }

  if (!rooms || rooms.length === 0) {
    return <div>No hot deals available</div>;
  }

  return (
    <section id="hot-deals" className="hot-deals-section">
      <h1 className="hot-deals-title">Hot Deals</h1>
      <div className="hot-deals-grid">
        {rooms.map((deal, i) => (
          <div
            key={i}
            className="property-card"
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
            <div className="property-card-content">
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
