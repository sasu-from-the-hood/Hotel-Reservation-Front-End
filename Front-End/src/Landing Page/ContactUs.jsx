import styles from "./ContactUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function ContactUs() {
  return (
    <section id="contact-us">
      <div className={styles.contactusContainer}>
        <div className={styles.contactInfo}>
          <h1>Contact Us</h1>
          <div className={styles.infoItem}>Hawassa, Ethiopia</div>
          <div className={styles.infoItem}>+251-915-67-7200</div>
          <div className={styles.infoItem}>NAFdigital@gmail.com</div>
        </div>
        <div className={styles.socialMedia}>
          <h1>Follow Us</h1>
          <div className={styles.icons}>
            <a
              href="https://t.me/your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTelegram} className={styles.icon} />
            </a>
            <a
              href="https://instagram.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
            </a>
            <a
              href="https://www.tiktok.com/@your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
