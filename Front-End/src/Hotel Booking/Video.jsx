import styles from "./Video.module.css";
export default function Video({ videoSrc }) {
  return (
    <div className={styles.videoContainer}>
      <video src={`/${videoSrc}`} autoPlay loop muted />
      <p>
        Experience luxury and comfort at Fenet Hotel, where exceptional service
        meets modern amenities in a serene environment.
      </p>
    </div>
  );
}
