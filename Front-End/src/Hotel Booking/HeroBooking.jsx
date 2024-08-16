export default function HeroBooking({ hotel }) {
  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <section id="hero-booking" className="hero-booking">
      <div className="relative">
        <img
          className="w-full h-full"
          src={`/${hotel.image}`}
          alt={hotel.name}
        />
        <div className="hero-text-center">
          <div className="text-xl">
            <span className="mb-0">WARDEL</span>
            <span className="mt-0">HOSPIYALITY</span>
          </div>
          <span className="pt-8 text-xl">{hotel.name}</span>
        </div>
        <div className="location-info">
          <span className="pt-8 text-xl">
            {hotel.location || "Hotel Location"}
          </span>
        </div>
        <div className="book-now">Book Your Stay &rarr;</div>
      </div>
    </section>
  );
}
