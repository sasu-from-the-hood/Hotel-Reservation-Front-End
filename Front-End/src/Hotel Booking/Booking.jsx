import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomSuits from "./RoomCatagory";
import Video from "./Video";
import Footer from "./Footer";

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
      <RoomSuits rooms={hotel.hotel_rooms} />
      <Video videoSrc={hotel.videoSrc} />
      <Footer />
    </>
  );
}

export default Booking;
