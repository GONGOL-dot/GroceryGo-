import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProducts.css";


const API_URL = "https://grocerygo-ecom-eb51.onrender.com//products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-products">
      <div className="admin-title">
        <div>
          <h1>Manage Products</h1>
          <p>Add, edit and manage your grocery products.</p>
        </div>

        <button className="add-product-btn">
          + Add Product
        </button>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                </td>

                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.stock || "Available"}</td>

                <td>
                  <button className="edit-btn">
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminProducts;