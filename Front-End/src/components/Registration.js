import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../authcontext";
import "./registration.css";

const VAPID_PUBLIC_KEY =
  "BIhj2zEAAFg6PBWWA54Zu_c3gmDsm-p5U_0fPUI22hK3QLb03BAR-FatR2sI5u2OqVeuEshruPDE_PXJ6Nrlr_8";

const Registration = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginUser, setLoginUser] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [swRegistration, setSwRegistration] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.post("http://localhost:5000/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registration successful!");
      setErrorMessage("");
      e.target.reset();
      toggleForm();
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.message;
        toast.error(errorMsg);
        setErrorMessage(errorMsg);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (swRegistration) {
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
        toast.error("Subscription failed. Please try again.");
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      login(token);
      localStorage.setItem("token", token);
      toast.success("User logged in successfully!", {
        onClose: () => {
          navigate("/");
        },
      });
      const previousLocation = location.state?.from || "/";
      navigate(previousLocation === "/reservation" ? "/reservation" : "/");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.error;
        toast.error(errorMsg);
        setErrorMessage(errorMsg);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      login(token);
      localStorage.setItem("token", token);
      toast.success("Admin logged in successfully!");
      navigate("/admindashboard");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.error;
        toast.error(errorMsg);
        setErrorMessage(errorMsg);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
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
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="Full name" name="name" required />
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
            <form onSubmit={loginUser ? handleUserLogin : handleAdminLogin}>
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
                    name="email"
                    placeholder="Admin email"
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
      <ToastContainer />
    </div>
  );
};

export default Registration;
