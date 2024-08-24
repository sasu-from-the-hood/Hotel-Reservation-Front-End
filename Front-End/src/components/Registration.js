import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./registration.css";

const VAPID_PUBLIC_KEY =
  "BL_VNDt5r9sIoVmjaxBOqD5Lpapo5NWE__vEIHW7zBlxl2n6YpRmym-f5DF7PohXR6cyVdI_dfyvfYkulkYca_Q";

const Registration = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginUser, setLoginUser] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [swRegistration, setSwRegistration] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          setSwRegistration(registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setErrorMessage("");
  };

  const toggleLoginType = () => {
    setLoginUser(!loginUser);
    setErrorMessage("");
  };

  const handleSubmit = async (e, url) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (url === "/user/login" && swRegistration) {
      try {
        let subscription = await swRegistration.pushManager.getSubscription();
        if (!subscription) {
          subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          });
        }
        const subscriptionData = await subscription.toJSON();
        data.subscription = JSON.stringify(subscriptionData);
      } catch (error) {
        console.error("Subscription failed:", error);
        setErrorMessage("Subscription failed. Please try again.");
        return;
      }
    }

    try {
      const response = await axios.post(`http://localhost:5000${url}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (url === "/user/login" || url === "/admin/login") {
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Redirect based on the previous location
        const previousLocation = location.state?.from || "/";
        if (url === "/user/login") {
          navigate(previousLocation === "/reservation" ? "/reservation" : "/");
        } else if (url === "/admin/login") {
          navigate("/admin-dashboard");
        }
      }

      setErrorMessage("");
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <div>
      <Link to="/">
        <div className="registration-logo">
          <img src="img/nafLogo.png" alt="Logo" />
        </div>
      </Link>
      <div className="registration-container">
        <div className={`wrapper ${isSignup ? "active" : ""}`}>
          <div className="form signup">
            <header className="signup-header" onClick={toggleForm}>
              Signup
            </header>
            <form onSubmit={(e) => handleSubmit(e, "/user/register")}>
              <input
                type="text"
                placeholder="Full name"
                name="fullname"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                name="email"
                required
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone number"
                required
              />
              <div>
                <label>ID Card Front:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="id_card_front"
                  required
                />
              </div>
              <div>
                <label>ID Card Back:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="id_card_back"
                  required
                />
              </div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <input
                className="btn"
                type="submit"
                name="submit"
                value="Signup"
              />
            </form>
          </div>

          <div className="form login">
            <header className="login-header" onClick={toggleForm}>
              Login
            </header>
            <form
              onSubmit={(e) =>
                handleSubmit(e, loginUser ? "/user/login" : "/admin/login")
              }
            >
              {loginUser ? (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="admin_id"
                    placeholder="Admin ID"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </>
              )}
              <input type="submit" value="Login" />
              <Link onClick={toggleLoginType}>
                {loginUser ? "Login as an Admin" : "Login as a User"}
              </Link>
            </form>
          </div>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default Registration;
