import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuActive((prev) => !prev);
  };

  const handleLinkClick = () => {
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
          isMobileMenuActive ? "active" : ""
        }`}
        onClick={handleMenuToggle}
      >
        X
      </p>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink} onClick={handleLinkClick}>
          Home
        </Link>
        <Link className={styles.navLink} onClick={handleLinkClick}>
          About
        </Link>
        <Link className={styles.navLink} onClick={handleLinkClick}>
          Hot Deals
        </Link>
        <Link className={styles.navLink} onClick={handleLinkClick}>
          Contact Us
        </Link>
      </div>
      <div className={styles.navButtons}>
        <Link
          to="/registration"
          className={styles.navButton}
          onClick={handleLinkClick}
        >
          Sign Up / Login
        </Link>
      </div>
      <div className={`${styles.mobileMenu} ${isMobileMenuActive ? "active" : ""}`}>
        <Link to="/" className={styles.navLink} onClick={handleLinkClick}>
          Home
        </Link>
        <Link className={styles.navLink} onClick={handleLinkClick}>
          About
        </Link>
        <Link className={styles.navLink} onClick={handleLinkClick}>
          Hot Deals
        </Link>
        <Link className={styles.navLink} onClick={handleLinkClick}>
          Contact Us
        </Link>
        <Link
          to="/registration"
          className={styles.navButton}
          onClick={handleLinkClick}
        >
          Sign Up / Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
