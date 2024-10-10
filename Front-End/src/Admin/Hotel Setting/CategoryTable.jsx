import React from "react";
import styles from "./HotelSetting.module.css";

export default function CategoryTable({ categories, onEditClick }) {
  return (
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
          {categories.map((category) => (
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
                  />
                )}
              </td>
              <td>
                <button onClick={() => onEditClick(category)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
