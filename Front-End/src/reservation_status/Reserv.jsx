import React, { useState } from "react";
import styles from "./Reserv.module.css";
// import BackToHome from "../components/BackToHome.jsx";
import Sidebar from "./Sidebar";
import Status from "./Status";
import AccountSettings from "./AccountSettings";

const Reserv = () => {
  const [activeSection, setActiveSection] = useState("status");

  return (
    <div className={styles.container}>
      {/* <BackToHome /> */}
      <div className={styles.dashboard}>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className={styles.content}>
          {activeSection === "status" ? <Status /> : <AccountSettings />}
        </div>
      </div>
    </div>
  );
};

export default Reserv;
