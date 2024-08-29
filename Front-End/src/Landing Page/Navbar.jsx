import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";
import { useAuth } from "../authcontext"; // Import useAuth from your context
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function

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
    setIsNotificationVisible((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from your context
    navigate("/"); // Redirect to home page after logout
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
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
        <FontAwesomeIcon icon={isMobileMenuActive ? faTimes : faBars} />
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
        {isAuthenticated && (
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
        )}
      </div>
      <div className={styles.navButtons}>
        {isAuthenticated ? (
          <>
            <button
              className={styles.navButton}
              onClick={handleNotificationClick}
            >
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className={styles.navButton} onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <Link
            to="/registration"
            className={styles.navButton}
            onClick={handleMenuToggle}
          >
            Sign Up / Login
          </Link>
        )}
      </div>
      {isNotificationVisible && (
        <div
          ref={notificationRef}
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
        {isAuthenticated && (
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
        )}
        {isAuthenticated ? (
          <button className={styles.navButton} onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link
            to="/registration"
            className={styles.navButton}
            onClick={handleMenuToggle}
          >
            Sign Up / Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
