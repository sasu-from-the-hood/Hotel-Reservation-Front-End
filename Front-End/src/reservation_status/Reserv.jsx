import React, { useState } from "react";
import styles from "./reserv.module.css";
import Sidebar from "./Sidebar";
import Status from "./status";
import AccountSettings from "./AccountSettings";

const Reserv = () => {
  const [activeSection, setActiveSection] = useState("status");

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <Sidebar
          activeSection={activeSection} // Pass activeSection to Sidebar
          setActiveSection={setActiveSection} // Pass setActiveSection to Sidebar
        />
        <div className={styles.content}>
          {/* Render the active section */}
          {activeSection === "status" ? <Status /> : <AccountSettings />}
        </div>
      </div>
    </div>
  );
};

export default Reserv;
