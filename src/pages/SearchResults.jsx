import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // URL nundi search query teesukuntundi
  const query = new URLSearchParams(location.search)
    .get("query")
    ?.toLowerCase() || "";

  // Products
  const products = [
    {
      id: 1,
      name: "Milk",
      price: 30,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b"
    },
    {
      id: 2,
      name: "Tomato",
      price: 40,
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b1a"
    },
    {
      id: 3,
      name: "Banana",
      price: 50,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e"
    },
    {
      id: 4,
      name: "Apple",
      price: 120,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6"
    }
  ];

  // Search filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div style={{ padding: "30px" }}>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <h2>Search Results for: {query}</h2>

      {filteredProducts.length > 0 ? (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                width: "220px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover"
                }}
              />

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>

              <button>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h3>No products found 😔</h3>
      )}

    </div>
  );
}

export default SearchResults;