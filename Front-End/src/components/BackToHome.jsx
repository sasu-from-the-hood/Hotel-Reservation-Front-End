import React from "react";
import { Link } from "react-router-dom";

export default function BackToHome() {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        left: "0",
        right: "0",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        zIndex: 1,
        height: "5rem",
      }}
    >
      <Link to="/">
        <img
          style={{
            width: "5rem",
            height: "5rem",
            objectFit: "cover",
            marginLeft: "20px",
          }}
          src="/img/nafLogo.png"
          alt="logo"
        />
      </Link>
    </div>
  );
}
