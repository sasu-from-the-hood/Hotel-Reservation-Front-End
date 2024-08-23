import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomSuits from "./RoomCatagory";
// import Video from "./Video";
import Footer from "./Footer";

function Booking() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/categories?hotel_id=${id}`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, [id]);

  if (categories.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RoomSuits categories={categories} />
      {/* <Video videoSrc={"path/to/video"} /> */}
      <Footer />
    </>
  );
}

export default Booking;
