import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import "../Styles/SubCategory.css";

function SubCategory() {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL nundi category name decode
  const decodedCategory = decodeURIComponent(categoryName || "");

  // ================= LOAD PRODUCTS =================

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Products loading failed");
        }

        return response.json();
      })
      .then((data) => {
        const categoryProducts = data.filter(
          (product) =>
            product.category
              ?.toLowerCase()
              .trim() ===
            decodedCategory.toLowerCase().trim()
        );

        setProducts(categoryProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setProducts([]);
        setLoading(false);
      });
  }, [decodedCategory]);

  // ================= ADD TO CART =================

  const addToCart = (product) => {
    const cartItems =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity =
        (existingProduct.quantity || 1) + 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

    alert(`${product.name} added to cart`);
  };

  // ================= ADD TO WISHLIST =================

  const addToWishlist = (product) => {
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (!alreadyExists) {
      wishlistItems.push(product);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlistItems)
      );

      alert(`${product.name} added to wishlist`);
    } else {
      alert("Product already in wishlist");
    }
  };

  return (
    <div className="subcategory-page">

      {/* BACK BUTTON */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <span className="back-arrow">←</span>
        Back
      </button>


      {/* HEADER */}

      <div className="subcategory-header">
        <h1>{decodedCategory}</h1>

        <p>
          Fresh products available in this category
        </p>
      </div>


      {/* LOADING */}

      {loading ? (
        <p className="no-items">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="no-items">
          No products available in {decodedCategory}
        </p>
      ) : (

        <div className="subcategory-grid">

          {products.map((product) => (

            <div
              className="subcategory-card"
              key={product.id}
            >

              {/* PRODUCT IMAGE */}

              <div className="subcategory-image-box">

                <img
                  src={product.image}
                  alt={product.name}
                />

                {/* WISHLIST */}

                <button
                  className="wishlist-heart"
                  onClick={() =>
                    addToWishlist(product)
                  }
                >
                  ♥
                </button>

              </div>


              {/* PRODUCT INFO */}

              <div className="subcategory-info">

                <h3>
                  {product.name}
                </h3>

                <p className="subcategory-category">
                  {product.category}
                </p>

                <h4>
                  ₹{product.price}
                </h4>


                {/* ADD TO CART */}

                <button
                  className="subcategory-cart-btn"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default SubCategory;