import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerSection}>
        <div>
          <h1 className={styles.footerTitle}>Location</h1>
          <div className={styles.footerContent}>
            <span>123 Anywhere St. Any City ST 12345</span>
            <span>Tel: +123-456-7890</span>
            <span>hello@reallygreatsite.com</span>
          </div>
        </div>
      </div>
      <div className={styles.footerSection}>
        <div>
          <h1 className={styles.footerTitle}>Business Hours</h1>
          <div className={styles.footerContent}>
            <span>Monday - Friday: 9AM - 5PM</span>
            <span>Saturday: 10AM - 4PM</span>
            <span>Sunday: Closed</span>
          </div>
        </div>
      </div>
      <div className={styles.footerSection}>
        <div>
          <h1 className={styles.footerTitle}>Get social</h1>
          <div className={styles.footerSocial}>
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              className={styles.icon}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              className={styles.icon}
            />
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              className={styles.icon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
