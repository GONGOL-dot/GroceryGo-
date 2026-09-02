import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CategoryPage.css";

function Category() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Fruits",
      image:
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Vegetables",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dairy",
      image:
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Bakery",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Rice & Grains",
      image:
        "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Spices",
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Beverages",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Snacks",
      image:
        "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Meat & Seafood",
      image:
        "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Frozen Foods",
      image:
        "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Breakfast & Cereals",
      image:
        "https://images.unsplash.com/photo-1517093602195-b40af9688b46?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Oils & Ghee",
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Sweets",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Instant Foods",
      image:
        "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Personal Care",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Household Items",
      image:
        "https://images.unsplash.com/photo-1583947582886-f40ec95dd752?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>Shop by Category</h1>

        <p>Choose your favourite grocery category</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <div
            className="category-card"
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
            />

            <div className="category-name">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;