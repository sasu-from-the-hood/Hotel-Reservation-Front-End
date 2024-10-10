import React, { useState, useEffect } from "react";
import CategoryTable from "./CategoryTable";
import Pagination from "./Pagination";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryModal from "./EditCategoryModal";
import styles from "./HotelSetting.module.css";

export default function HotelSetting() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 7;

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

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleUpdateCategory = (updatedCategory) => {
    fetch(
      `http://localhost:5000/admin/category/update/${updatedCategory.category_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: updatedCategory,
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetchCategories();
        setShowModal(false);
        setEditingCategory(null);
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.container}>
      <h1>Admin Category Manager</h1>

      <CategoryTable
        categories={currentCategories}
        onEditClick={handleEditClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(categories.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      <AddCategoryForm onCategoryAdded={fetchCategories} />

      {showModal && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdateCategory}
        />
      )}
    </div>
  );
}
