import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HotelListing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faDumbbell,
  faWaterLadder,
  faBurger,
  faArrowDownAZ,
} from "@fortawesome/free-solid-svg-icons";

export default function HotelListing() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/Book/${id}`);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <div className="hotel-list-container">
        <h1>Hotel Listing</h1>
        <div>
          <input
            className="search"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="sort-btn">
            <FontAwesomeIcon icon={faArrowDownAZ} />
          </button>
        </div>
        <div className="hotel-list-grid">
          {filteredHotels.map((hotel) => (
            <div className="hotel" key={hotel.id}>
              <div className="hotel-service">
                <img src={hotel.image} alt={hotel.name} />
                <div>
                  <h4>{hotel.name}</h4>
                  <span>
                    <FontAwesomeIcon icon={faWifi} className="icons" />
                    <FontAwesomeIcon icon={faDumbbell} className="icons" />
                    <FontAwesomeIcon icon={faWaterLadder} className="icons" />
                    <FontAwesomeIcon icon={faBurger} className="icons" />
                  </span>
                </div>
              </div>
              <div className="hotel-services-con">
                <hr className="line" />
                <div className="hotel-services">
                  {hotel.rooms.map((room, index) => (
                    <div key={index}>
                      <span>{room.type}</span>
                      <span>{room.price}</span>
                    </div>
                  ))}
                </div>
                <hr className="line" />
                <div className="btn">
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
