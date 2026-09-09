import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCategories.css";
import {API} from "../Api"

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${API}/categories`
      );

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      await axios.post(
        `${API}/categories`,
        {
          name: categoryName
        }
      );

      setCategoryName("");
      getCategories();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    await axios.delete(
      `${API}/categories/${id}`
    );

    getCategories();
  };

  return (
    <div className="admin-categories">

      <h1>Manage Categories</h1>

      <div className="category-form">

        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(e.target.value)
          }
        />

        <button onClick={addCategory}>
          Add Category
        </button>

      </div>

      <div className="category-list">

        {categories.map((category) => (
          <div
            className="category-item"
            key={category.id}
          >

            <span>
              {category.name}
            </span>

            <button
              onClick={() =>
                deleteCategory(category.id)
              }
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminCategories;