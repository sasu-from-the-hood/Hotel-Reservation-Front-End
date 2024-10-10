import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";
import ConfirmationModal from "../Admin/ConfirmationModal"; // Import the ConfirmationModal
import { useAuth } from "../authcontext"; // Import useAuth from your context
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function

  const handleMenuToggle = () => {
    setIsMobileMenuActive((prev) => !prev);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      navigate("/", { state: { targetId } });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (isMobileMenuActive) {
      setIsMobileMenuActive(false); // Close mobile menu on link click
    }
  };

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setIsNotificationVisible((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
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
        <a
          href="#home"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "home")}
        >
          Home
        </a>
        <a
          href="#hot-deals"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "hot-deals")}
        >
          Hot Deals
        </a>
        <a
          href="#about-us"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "about-us")}
        >
          About Us
        </a>
        <a
          href="#contact-us"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "contact-us")}
        >
          Contact Us
        </a>
        {isAuthenticated && (
          <a
            href="#reservations"
            className={styles.navLink}
            onClick={() => navigate("/reservations")}
          >
            Status
          </a>
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
            <button className={styles.navButton} onClick={handleLogoutClick}>
              Log Out
            </button>
          </>
        ) : (
          <a
            href="#registration"
            className={styles.navButton}
            onClick={() => navigate("/registration")}
          >
            Sign Up / Login
          </a>
        )}
      </div>
      {isNotificationVisible && (
        <div ref={notificationRef} className={styles.notificationOverlay}>
          <Notification />
        </div>
      )}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuActive ? styles.active : ""
        }`}
      >
        <a
          href="#home"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "home")}
        >
          Home
        </a>
        <a
          href="#hot-deals"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "hot-deals")}
        >
          Hot Deals
        </a>
        <a
          href="#about-us"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "about-us")}
        >
          About Us
        </a>
        <a
          href="#contact-us"
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, "contact-us")}
        >
          Contact Us
        </a>
        {isAuthenticated && (
          <a
            href="#reservations"
            className={styles.navLink}
            onClick={() => {
              handleMenuToggle();
              navigate("/reservations");
            }}
          >
            Status
          </a>
        )}
        {isAuthenticated ? (
          <button className={styles.navButton} onClick={handleLogoutClick}>
            Log Out
          </button>
        ) : (
          <a
            href="#registration"
            className={styles.navButton}
            onClick={() => {
              handleMenuToggle();
              navigate("/registration");
            }}
          >
            Sign Up / Login
          </a>
        )}
      </div>
      {/* Confirmation Modal for Logout */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </nav>
  );
};

export default Navbar;
