import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroBooking from "./HeroBooking";
import GoogleMap from "./GoogleMap";
import RoomSuits from "./RoomSuits";
import Video from "./Video";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
import "./Hotel.css";

function Booking() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => setHotel(data))
      .catch((error) => console.error("Error fetching hotel:", error));
  }, [id]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeroBooking hotel={hotel} />
      <GoogleMap mapSrc={hotel.mapSrc} />
      <RoomSuits rooms={hotel.hotel_rooms} />
      <Video videoSrc={hotel.videoSrc} />
      <Testimonial />
      <Footer />
    </>
  );
}

export default Booking;
