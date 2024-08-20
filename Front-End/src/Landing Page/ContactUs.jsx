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
        <span className={styles.brandName}>NAF SMMA.</span>
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h1>Contact Us</h1>
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
            <div className={styles.infoItem}>Hawassa, Ethiopia</div>
            <div className={styles.infoItem}>+251-915-67-7200</div>
            <div className={styles.infoItem}>NAFdigital@gmail.com</div>
          </div>
          <form className={styles.contactForm}>
            {/* <input
              type="text"
              placeholder="Full Name"
              required
              className={styles.inputField}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className={styles.inputField}
            />
            <textarea
              placeholder="Message"
              cols="30"
              rows="6"
              required
              className={styles.textareaField}
            ></textarea>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </section>
  );
}
