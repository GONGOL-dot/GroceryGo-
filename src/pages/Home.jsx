import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../Styles/Home.css";

function Home() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);


  // ================= CART CONTEXT =================

  const {
    addToCart,
    toggleWishlist,
    wishlistItems = [],
  } = useCart();


  // ================= SLIDES =================

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
      title: "Fresh Groceries Delivered",
      text: "Healthy and fresh products delivered to your home.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1600&q=80",
      title: "Fresh Fruits & Vegetables",
      text: "Get fresh groceries at the best prices.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1600&q=80",
      title: "Quality Products",
      text: "Shop your daily essentials easily.",
    },
  ];


  // ================= LOAD PRODUCTS =================

  useEffect(() => {

    fetch("https://grocerygo-ecom.onrender.com//products")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })

      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })

      .catch((error) => {
        console.log("Error loading products:", error);
        setProducts([]);
      });

  }, []);


  // ================= AUTO SLIDER =================

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((previous) =>
        previous === slides.length - 1
          ? 0
          : previous + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, [slides.length]);


  // ================= ADD TO CART =================

  const handleAddToCart = (product) => {
    addToCart(product);
  };


  // ================= WISHLIST =================

  const handleWishlist = (product) => {
    toggleWishlist(product);
  };


  // ================= SHOP NOW =================

  const handleShopNow = () => {

    document
      .querySelector(".products-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });

  };


  return (

    <div className="home-page">


      {/* ================= HERO SLIDER ================= */}

      <section className="hero-slider">


        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="slide-image"
        />


        <div className="slide-overlay">

          <div className="slide-content">

            <h1>
              {slides[currentSlide].title}
            </h1>

            <p>
              {slides[currentSlide].text}
            </p>


            <button
              className="shop-now-btn"
              onClick={handleShopNow}
            >
              Shop Now
            </button>

          </div>

        </div>


        {/* ================= SLIDER DOTS ================= */}

        <div className="slider-dots">

          {slides.map((slide, index) => (

            <button
              key={index}
              className={
                currentSlide === index
                  ? "slider-dot active"
                  : "slider-dot"
              }
              onClick={() =>
                setCurrentSlide(index)
              }
            />

          ))}

        </div>


      </section>


      {/* ================= PRODUCTS ================= */}

      <section className="products-section">


        <div className="products-heading">

          <h1>
            Fresh Groceries
          </h1>

          <p>
            Fresh products at the best prices
          </p>

        </div>


        {products.length === 0 ? (

          <p className="loading-text">

            No products available.

            <br />

            Please start JSON Server.

          </p>

        ) : (

          <div className="products-grid">

            {products.map((product) => {


              const isWishlisted =
                wishlistItems.some(
                  (item) =>
                    String(item.id) ===
                    String(product.id)
                );


              return (

                <div
                  className="product-card"
                  key={product.id}
                >


                  {/* WISHLIST */}

                  <button
                    className={
                      isWishlisted
                        ? "wishlist-heart active-heart"
                        : "wishlist-heart"
                    }
                    onClick={() =>
                      handleWishlist(product)
                    }
                  >
                    {isWishlisted ? "♥" : "♡"}
                  </button>


                  {/* PRODUCT IMAGE */}

                  <div className="product-image-box">

                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  </div>


                  {/* PRODUCT INFO */}

                  <div className="product-info">

                    <h3>
                      {product.name}
                    </h3>


                    <p className="product-category">
                      {product.category}
                    </p>


                    <p className="product-price">
                      ₹{product.price}
                    </p>


                    <button
                      className="add-cart-btn"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >
                      Add to Cart 🛒
                    </button>

                  </div>


                </div>

              );

            })}

          </div>

        )}

      </section>


    </div>
  );
}


export default Home;