import Navbar from "./Navbar.jsx";
import HeroComponent from "./HeroSection.jsx";
import HotDeals from "./HotDeals.jsx";
import AboutUs from "./AboutUs.jsx";
import ContactUs from "./ContactUs.jsx";
import { useAuth } from "../authcontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (userType === "admin") {
        navigate("/admindashboard");
      } else if (userType === "superadmin") {
        navigate("/superadmin");
      }
    }
  }, [isAuthenticated, userType, navigate]);

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
