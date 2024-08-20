import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";
const HeroComponent = () => {
  return (
    <section id="home">
      <div className={styles.heroContainer}>
        <div className={styles.textContainer}>
          <h1>Let us help you find your ideal hotel</h1>
          <p>
            Discover the perfect hotel for your stay with personalized
            recommendations tailored to your preferences and budget
          </p>
          <div className={styles.buttons}>
            <Link to="/list-of-hotels" className={styles.bookBtn}>
              List of Hotels
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
