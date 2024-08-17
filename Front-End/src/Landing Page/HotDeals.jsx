import styles from './HotDeals.module.css';

const hotDeals = [
  {
    image: "img/fenet-bed-room.JPG",
    type: "Row House",
    address: "123 Anywhere ST. any city",
    details: "2 Bed | 1 Bath | 1 Car",
  },
  {
    image: "img/dark-bed-room.JPG",
    type: "Row House",
    address: "123 Anywhere ST. any city",
    details: "2 Bed | 1 Bath | 1 Car",
  },
  {
    image: "img/bedroom.JPG",
    type: "Row House",
    address: "123 Anywhere ST. any city",
    details: "2 Bed | 1 Bath | 1 Car",
  },
];

const HotDeals = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Hot Deals</h1>
      <div className={styles.gridContainer}>
        {hotDeals.map((deals, index) => (
          <HotDealCard key={index} deal={deals} />
        ))}
      </div>
    </section>
  );
};
function HotDealCard({ deal }) {
  return (
    <section>
      <div className={styles.propertyCard}>
        <img  src={`${deal.image}`} alt={deal.type} />
        <hr className={styles.divider} />
        <div className={styles.propertyDetails}>
          <span>{deal.type}</span>
          <span>{deal.address}</span>
          <span>{deal.details}</span>
        </div>
        <hr className={styles.divider} />
      </div>
    </section>
  );
}
export default HotDeals;
