import Navbar from "./Navbar.jsx";
import HeroComponent from "./HeroSection.jsx";
import HotDeals from "./HotDeals.jsx";
import AboutUs from "./AboutUs.jsx";
import ContactUs from "./ContactUs.jsx";


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroComponent />
      <HotDeals />
      <AboutUs />
      <ContactUs />
    </>
  );
}
