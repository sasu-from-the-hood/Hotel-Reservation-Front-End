import React, { useEffect, useState } from "react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    hotelCount: 0,
    roomCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/user"); // Replace with your API endpoint
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="about-us">
      <div className={styles.aboutusContainer}>
        {/* <div className={styles.imgContainer}>
          <img
            className={styles.image}
            src="https://s3-alpha-sig.figma.com/img/95d7/f43f/7aa2e474653987bee1f0c21ee00a24b2?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G1ieKF0fI2L8jAHoU3swX5mPXbKNN~6TB76~SGyhQwwaq27JubwtjtYUaDuWGDpVs-rg9xC8qJqfJU3YhqOaT~vd3Avzmw~ea9il9e6ESyk8-AqY-K0B~KKoKzTAEE85OQIkidrcqLqKmaj9xIA69rCvIxwgnsu~Xy2aqNY5F~9hQuYFrOW~giLA~MyW2n6TCt5MnxHbQ3VzNUwxng5j99kZVlAm59WB5EaPfHIRgh17WafPd8Bl~15WEfTTnw9M9hvZER4g2AQ--mmxPnAfqjBMtK9X0DM3V9y9SMCKoKFSjG9fi2lggEjkAfX-ACFkNVmAbL7aSdPoS3DTWRf4FQ__"
            alt="room"
          />
        </div> */}
        <div className={styles.textsContainer}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.text}>
            Our website offers a convenient and user-friendly platform for
            booking hotels across various destinations. With a vast selection of
            accommodations to choose from, we provide travelers with the
            flexibility to find the perfect hotel that suits their preferences
            and budget. The features detailed descriptions and images of each
            hotel, along with reviews from previous guests to help you make an
            informed decision.
          </p>
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <h3>Users</h3>
              <p>{stats.userCount}</p>
            </div>
            <div className={styles.stat}>
              <h3>Hotels</h3>
              <p>{stats.hotelCount}</p>
            </div>
            <div className={styles.stat}>
              <h3>Rooms</h3>
              <p>{stats.roomCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default AboutUs;
