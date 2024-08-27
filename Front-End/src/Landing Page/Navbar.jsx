import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleMenuToggle = () => {
    setIsMobileMenuActive((prev) => !prev);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }

    if (isMobileMenuActive) {
      setIsMobileMenuActive(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="img/nafLogo.png" alt="Logo" />
      </div>
      <p
        className={`${styles.menuIcon} ${
          isMobileMenuActive ? styles.active : ""
        }`}
        onClick={handleMenuToggle}
      >
        <FontAwesomeIcon icon={isMobileMenuActive ? faTimes : faBars} />
      </p>
      <div className={styles.navLinks}>
        <Link
          to="#home"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "home")}
        >
          Home
        </Link>
        <Link
          to="#hot-deals"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "hot-deals")}
        >
          Hot Deals
        </Link>
        <Link
          to="#about-us"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "about-us")}
        >
          About Us
        </Link>
        <Link
          to="#contact-us"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "contact-us")}
        >
          Contact Us
        </Link>
        <Link
          to="/status" // Updated to navigate to the Status component
          className={styles.navLink}
          onClick={(e) => {
            e.preventDefault();
            handleMenuToggle(); // Close the mobile menu if open
            navigate("/status"); // Use navigate to redirect
          }}
        >
          Status
        </Link>
      </div>
      <div className={styles.navButtons}>
        <Link
          to="/registration"
          className={styles.navButton}
          onClick={handleMenuToggle}
        >
          Sign Up / Login
        </Link>
      </div>
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuActive ? styles.active : ""
        }`}
      >
        <Link
          to="#home"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "home")}
        >
          Home
        </Link>
        <Link
          to="#hot-deals"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "hot-deals")}
        >
          Hot Deals
        </Link>
        <Link
          to="#about-us"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "about-us")}
        >
          About Us
        </Link>
        <Link
          to="#contact-us"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "contact-us")}
        >
          Contact Us
        </Link>
        <Link
          to="/reservations" // Updated to navigate to the Status component
          className={styles.navLink}
          onClick={(e) => {
            e.preventDefault();
            handleMenuToggle(); // Close the mobile menu if open
            navigate("/reservations"); // Use navigate to redirect
          }}
        >
          Status
        </Link>
        <Link
          to="/registration"
          className={styles.navButton}
          onClick={handleMenuToggle}
        >
          Sign Up / Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
