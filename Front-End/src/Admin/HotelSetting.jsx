import React, { useState, useEffect } from "react";
import styles from "./HotelSetting.module.css";

const HotelSetting = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    price: "",
    description: "",
    rooms: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  // Handle rooms input separately
  const handleRoomsChange = (e) => {
    const { value } = e.target;
    setNewCategory({
      ...newCategory,
      rooms: value, 
    });
  };

  
  const handleAddCategory = (e) => {
    e.preventDefault();

    const roomsArray = newCategory.rooms
      .split(",")
      .map((room) => room.trim())
      .filter((room) => room !== "" && !isNaN(room))
      .map((room) => parseInt(room, 10));

    fetch("http://localhost:5000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: newCategory.name,
        price: newCategory.price,
        description: newCategory.description,
        total_rooms: roomsArray.length,
        available_rooms: roomsArray.length,
        rooms: roomsArray,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Category and rooms added successfully");
        setCategories([...categories, data]);
        setNewCategory({ name: "", price: "", description: "", rooms: "" }); 
      })
      .catch((error) => console.error("Error adding category:", error));
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <h1>Admin Category Manager</h1>

      <div>
        <h2>All Categories</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Total Rooms</th>
              <th>Available Rooms</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_name}</td>
                <td>{category.price} ETB</td>
                <td>{category.description}</td>
                <td>{category.total_rooms}</td>
                <td>{category.available_rooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            className={currentPage === number + 1 ? styles.active : ""}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      
      <div className={styles.formContainer}>
        <h2>Add New Category</h2>
        <form onSubmit={handleAddCategory}>
          <div>
            <label>Category Name:</label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newCategory.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newCategory.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div>
            <label>Rooms (comma-separated):</label>
            <input
              type="text"
              name="rooms"
              value={newCategory.rooms}
              onChange={handleRoomsChange}
              required
            />
          </div>
          <div className={styles.btn}>
            <button type="submit">Add Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelSetting;
