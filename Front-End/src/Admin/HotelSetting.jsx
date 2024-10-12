import React, { useState, useEffect } from "react";
import styles from "./HotelSetting.module.css";

const HotelSetting = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    price: "",
    description: "",
    rooms: "",
    photo: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCategories = () => {
    fetch("http://localhost:5000/admin/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleRoomsChange = (e) => {
    const { value } = e.target;
    setNewCategory({
      ...newCategory,
      rooms: value,
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
      .then((data) => {
        alert("Category and rooms added successfully");
        fetchCategories(); // Refresh categories after adding
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

  const handleUpdateCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", editingCategory.category_id);
    formData.append(
      "category_name",
      newCategory.name || editingCategory.category_name
    );
    formData.append("price", newCategory.price || editingCategory.price);
    formData.append(
      "description",
      newCategory.description || editingCategory.description
    );
    formData.append("photo", newCategory.photo || editingCategory.photo);

    fetch(
      `http://localhost:5000/admin/category/update/${editingCategory.category_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((updatedCategory) => {
        alert("Category updated successfully");
        fetchCategories(); // Refresh categories after updating
        setEditingCategory(null);
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.category_name,
      price: category.price,
      description: category.description,
      rooms: category.total_rooms, // Assuming you want to show total rooms
      photo: null,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
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
              <th>Photo</th>
              <th>Action</th>
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
                <td>
                  {category.photo && (
                    <img
                      src={`http://localhost:5000/hotel_image/${category.photo}`}
                      alt="Category"
                      width="50"
                    />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => openModal(category)}
                    className={styles.actionButton}
                  >
                    Edit
                  </button>
                </td>
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
          <div>
            <label>Photo:</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className={styles.btn}>
            <button type="submit">Add Category</button>
          </div>
        </form>
      </div>

      {/* Modal for Editing Category */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Category</h2>
            <form onSubmit={handleUpdateCategory}>
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
              <div>
                <label>Photo:</label>
                <input type="file" name="photo" onChange={handleFileChange} />
              </div>
              <div className={styles.btn}>
                <button type="submit">Update Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelSetting;
