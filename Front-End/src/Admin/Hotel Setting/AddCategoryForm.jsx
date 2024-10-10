import React, { useState } from "react";
import styles from "./HotelSetting.module.css";

export default function AddCategoryForm({ onCategoryAdded }) {
  const [newCategory, setNewCategory] = useState({
    name: "",
    price: "",
    description: "",
    rooms: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setNewCategory({
      ...newCategory,
      photo: e.target.files[0],
    });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_name", newCategory.name);
    formData.append("price", newCategory.price);
    formData.append("description", newCategory.description);
    formData.append("rooms", newCategory.rooms);
    formData.append("photo", newCategory.photo);

    fetch("http://localhost:5000/admin/category/addcategory", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        alert("Category and rooms added successfully");
        onCategoryAdded();
        setNewCategory({
          name: "",
          price: "",
          description: "",
          rooms: "",
          photo: null,
        });
      })
      .catch((error) => console.error("Error adding category:", error));
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Category</h2>
      <form onSubmit={handleAddCategory}>
        <div>
          <label htmlFor="name">Category Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            name="price"
            value={newCategory.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newCategory.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rooms">Rooms (comma-separated):</label>
          <input
            id="rooms"
            type="text"
            name="rooms"
            value={newCategory.rooms}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            id="photo"
            type="file"
            name="photo"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}
