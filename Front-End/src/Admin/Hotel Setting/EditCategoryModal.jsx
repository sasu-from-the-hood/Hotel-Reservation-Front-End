import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import styles from "./HotelSetting.module.css";

export default function EditCategoryModal({ category, onClose, onUpdate }) {
  const [editedCategory, setEditedCategory] = useState({
    name: category.category_name,
    price: category.price,
    description: category.description,
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory({
      ...editedCategory,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setEditedCategory({
      ...editedCategory,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_id", category.category_id);
    formData.append("category_name", editedCategory.name);
    formData.append("price", editedCategory.price);
    formData.append("description", editedCategory.description);
    if (editedCategory.photo) {
      formData.append("photo", editedCategory.photo);
    }
    onUpdate(formData);
  };

  return (
    <div open={true} onOpenChange={onClose} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <FontAwesomeIcon icon={faBuilding} className={styles.buildingIcon} />
          <h3>Edit Category</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name">Category Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={editedCategory.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              name="price"
              value={editedCategory.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editedCategory.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="photo">Photo:</label>
            <input
              id="photo"
              type="file"
              name="photo"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose} variant="outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
