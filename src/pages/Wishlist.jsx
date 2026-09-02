import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../Styles/Wishlistpage.css";

function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlistItems = [],
    removeFromWishlist,
    addToCart,
  } = useCart();

  // Empty Wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>
            My Wishlist <FiHeart />
          </h1>

          <p>Your favourite products</p>
        </div>

        <div className="empty-wishlist">
          <FiHeart className="empty-wishlist-icon" />

          <h2>Your Wishlist is Empty</h2>

          <p>Add your favourite products to wishlist.</p>

          <button
            onClick={() => navigate("/")}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">
        <h1>
          My Wishlist <FiHeart />
        </h1>

        <p>Your favourite products</p>
      </div>

      <div className="wishlist-grid">

        {wishlistItems.map((item) => (
          <div
            className="wishlist-card"
            key={item.id}
          >

            <div className="wishlist-image-box">
              <img
                src={item.image}
                alt={item.name}
              />

              <button
                className="wishlist-remove-btn"
                onClick={() =>
                  removeFromWishlist(item.id)
                }
              >
                <FiTrash2 />
              </button>
            </div>

            <div className="wishlist-info">

              <h3>{item.name}</h3>

              <p>
                {item.category || "Groceries"}
              </p>

              <h4>
                ₹{item.price}
              </h4>

              <button
                className="wishlist-cart-btn"
                onClick={() => {
                  addToCart(item);
                  alert(`${item.name} added to cart`);
                }}
              >
                <FiShoppingCart />
                Add to Cart
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Wishlist;