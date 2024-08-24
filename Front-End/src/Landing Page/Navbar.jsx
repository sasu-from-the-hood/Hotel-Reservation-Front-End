import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const navigate = useNavigate();

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
        X
      </p>
      <div
        className={`${styles.navLinks} ${
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
          to="/reservations"
          className={styles.navLink}
          onClick={(e) => {
            e.preventDefault();
            handleMenuToggle();
            navigate("/reservations");
          }}
        >
          Status
        </Link>
      </div>
      <div className={styles.navButtons}>
        <Link
          to="/notification"
          className={styles.navButton}
          onClick={handleMenuToggle}
        >
          <FontAwesomeIcon icon={faBell} /> {/* Notification Icon */}
        </Link>
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
          to="/reservations"
          className={styles.navLink}
          onClick={(e) => {
            e.preventDefault();
            handleMenuToggle();
            navigate("/reservations");
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
