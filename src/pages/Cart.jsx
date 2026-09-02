import React from "react";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingCart,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../Styles/Cartpage.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems = [],
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // ================= TOTAL ITEMS =================

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // ================= TOTAL AMOUNT =================

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  // ================= EMPTY CART =================

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>
            My Cart <FiShoppingCart />
          </h1>

          <p>Your grocery shopping cart</p>
        </div>

        <div className="empty-cart">
          <FiShoppingCart className="empty-cart-icon" />

          <h2>Your Cart is Empty</h2>

          <p>Add some fresh products to your cart.</p>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ================= CART =================

  return (
    <div className="cart-page">

      {/* ================= HEADER ================= */}

      <div className="cart-header">
        <h1>
          My Cart <FiShoppingCart />
        </h1>

        <p>Review your selected products</p>
      </div>


      {/* ================= CART CONTAINER ================= */}

      <div className="cart-container">

        {/* ================= CART ITEMS ================= */}

        <div className="cart-items">

          {cartItems.map((item, index) => (

            <div
              className="cart-item"
              key={item.id || index}
            >

              {/* PRODUCT IMAGE */}

              <div className="cart-image-box">

                <img
                  src={item.image}
                  alt={item.name || "Product"}
                  className="cart-product-image"
                />

              </div>


              {/* PRODUCT DETAILS */}

              <div className="cart-item-details">

                <h3>
                  {item.name || "Product"}
                </h3>


                <p className="cart-category">
                  {item.category || "Groceries"}
                </p>


                <p className="cart-price">
                  ₹{item.price}
                </p>


                {/* QUANTITY CONTROLS */}

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    <FiMinus />
                  </button>


                  <span>
                    {item.quantity || 1}
                  </span>


                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    <FiPlus />
                  </button>

                </div>


                {/* PRODUCT TOTAL */}

                <h4>
                  Total: ₹
                  {Number(item.price || 0) *
                    Number(item.quantity || 1)}
                </h4>

              </div>


              {/* REMOVE BUTTON */}

              <button
                type="button"
                className="remove-cart-item"
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                <FiTrash2 />
              </button>

            </div>

          ))}

        </div>


        {/* ================= ORDER SUMMARY ================= */}

        <div className="order-summary">

          <h2>Order Summary</h2>


          <div className="summary-row">

            <span>Total Items</span>

            <span>
              {totalItems}
            </span>

          </div>


          <div className="summary-row">

            <span>Total Amount</span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>


          {/* CHECKOUT */}

          <button
            type="button"
            className="checkout-btn"
            onClick={() => navigate("/Payment")}
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;