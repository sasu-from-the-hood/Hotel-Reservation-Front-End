import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <div>
          <h1 className="footer-title">Location</h1>
          <div className="footer-content">
            <span>123 Anywhere St. Any City ST 12345</span>
            <span>Tel: +123-456-7890</span>
            <span>hello@reallygreatsite.com</span>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <div>
          <h1 className="footer-title">Business Hours</h1>
          <div className="footer-content">
            <span>Monday - Friday: 9AM - 5PM</span>
            <span>Saturday: 10AM - 4PM</span>
            <span>Sunday: Closed</span>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <div>
          <h1 className="footer-title">Get social</h1>
          <div className="footer-social">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
            <FontAwesomeIcon icon={faInstagram} size="2x" />
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </div>
        </div>
      </div>
    </div>
  );
}
