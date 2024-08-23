import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginUser, setLoginUser] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setErrorMessage(""); // Reset error message when toggling
  };

  const toggleLoginType = () => {
    setLoginUser(!loginUser);
    setErrorMessage(""); // Reset error message when toggling login type
  };

  const handleSubmit = async (e, url) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(`http://localhost:5000${url}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setErrorMessage(""); // Reset error message
      e.target.reset(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Set error state if error from backend
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
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
            <form onSubmit={(e) => handleSubmit(e, "/signup")}>
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
                <label>ID Card Front :</label>
                <input type="file" accept="image/*" required />
              </div>
              <div>
                <label>ID Card Back :</label>
                <input type="file" accept="image/*" required />
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
                handleSubmit(e, loginUser ? "/login" : "/admin-login")
              }
            >
              {loginUser ? (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="User name"
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
