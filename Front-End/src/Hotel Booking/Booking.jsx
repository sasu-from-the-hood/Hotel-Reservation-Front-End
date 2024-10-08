import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomSuits from "./RoomCatagory";
import Footer from "./Footer";
import BackToHome from "../components/BackToHome";
import LoadingPage from "../components/LoadingPage";

function Booking() {
  const { id } = useParams(); // Extract the hotel ID from the URL parameters
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from the correct endpoint
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/hotel/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log("Fetched categories:", data); // Log fetched data

        // Ensure correct data types
        const formattedCategories = data.map((category) => ({
          ...category,
          price: parseFloat(category.price), // Convert price to number
          hotel_id: id,
          available_rooms: parseInt(category.available_rooms, 10), // Convert available_rooms to number
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <BackToHome />
      <RoomSuits categories={categories} />
      {/* <Video videoSrc={"path/to/video"} /> */}
      <Footer />
    </>
  );
}

export default Booking;
