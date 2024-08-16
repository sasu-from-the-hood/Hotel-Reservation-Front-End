export default function GoogleMap({ mapSrc }) {
  if (!mapSrc) {
    return <div>Map is not available</div>;
  }

  return (
    <iframe
      src={mapSrc}
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map"
      aria-label="Google Map showing the location of the hotel"
    />
  );
}
