import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./accountSetting.module.css";

const AccountSettings = () => {
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/user/account_data",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAccountData(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch account data.");
      console.error("Error fetching account data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.put("http://localhost:5000/user/account_update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Account updated successfully.");
    } catch (error) {
      console.error("Error updating account:", error.message);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}> {/* Container for styling */}
      <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#007bff" }}>
        Account Settings
      </h2>
      <form className={styles.accountForm} onSubmit={handleAccountUpdate}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={accountData.name}
            onChange={(e) =>
              setAccountData({ ...accountData, name: e.target.value })
            }
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={accountData.email}
            onChange={(e) =>
              setAccountData({ ...accountData, email: e.target.value })
            }
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={accountData.phone_number}
            onChange={(e) =>
              setAccountData({ ...accountData, phone_number: e.target.value })
            }
          />
        </label>
        <label>
          New Password:
          <input type="password" name="password" placeholder="Leave blank if not changing" />
        </label>
        <label>
          ID Card Front Photo:
          <input type="file" name="id_card_front" />
        </label>
        <label>
          ID Card Back Photo:
          <input type="file" name="id_card_back" />
        </label>
        <button type="submit" className={styles.saveButton}>
          Update Account
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
