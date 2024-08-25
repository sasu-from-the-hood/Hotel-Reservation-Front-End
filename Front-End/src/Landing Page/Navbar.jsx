import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification"; // Import the Notification component
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false); // State to manage notification visibility
  const notificationRef = useRef(null); // Ref for the notification overlay
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

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setIsNotificationVisible((prev) => !prev); // Toggle notification visibility
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // If clicking outside the notification area, hide the notification
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target) &&
        !e.target.closest(`.${styles.navButton}`)
      ) {
        setIsNotificationVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <button className={styles.navButton} onClick={handleNotificationClick}>
          <FontAwesomeIcon icon={faBell} />
        </button>
        <Link
          to="/registration"
          className={styles.navButton}
          onClick={handleMenuToggle}
        >
          Sign Up / Login
        </Link>
      </div>
      {isNotificationVisible && (
        <div
          ref={notificationRef} // Attach the ref to the notification overlay
          className={styles.notificationOverlay}
        >
          <Notification />
        </div>
      )}
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
