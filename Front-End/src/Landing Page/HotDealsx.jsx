import React, { useEffect, useState } from "react";
import styles from "./HotDeals.module.css";

const HotDeals = () => {
  const [hotDeals, setHotDeals] = useState([]);

  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/top-hotels"); // Replace with your API endpoint
        const data = await response.json();
        setHotDeals(data);
      } catch (error) {
        console.error("Error fetching hot deals:", error);
      }
    };

    fetchHotDeals();
  }, []);

  return (
    <section id="hot-deals" className={styles.section}>
      <h1 className={styles.title}>Hot Deals</h1>
      <div className={styles.gridContainer}>
        {hotDeals.map((deal) => (
          <HotDealCard key={deal.hotel_id} deal={deal} />
        ))}
      </div>
    </section>
  );
};

function HotDealCard({ deal }) {
  return (
    <section>
      <div className={styles.propertyCard}>
        <img src={deal.photo} alt={deal.hotel_name} />
        <hr className={styles.divider} />
        <div className={styles.propertyDetails}>
          <span>{deal.hotel_name}</span>
          <a href={deal.location} target="_blank" rel="noreferrer">
            Location
          </a>
          <span>Rating: {deal.rating}</span>
        </div>
        <hr className={styles.divider} />
      </div>
    </section>
  );
}

export default HotDeals;
