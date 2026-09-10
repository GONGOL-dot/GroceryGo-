import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminReviews.css";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    try {
      const response = await axios.get(
        "https://grocerygo-ecom-eb51.onrender.com/reviews"
      );

      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const deleteReview = async (id) => {
    await axios.delete(
      `https://grocerygo-ecom-eb51.onrender.com/reviews/${id}`
    );

    getReviews();
  };

  return (
    <div className="admin-reviews">

      <h1>Customer Reviews</h1>

      <div className="reviews-container">

        {reviews.length === 0 && (
          <p>No reviews available.</p>
        )}

        {reviews.map((review) => (
          <div
            className="review-card"
            key={review.id}
          >

            <h3>
              {review.name || "Customer"}
            </h3>

            <div className="rating">
              ⭐ {review.rating || 5}/5
            </div>

            <p>
              {review.comment}
            </p>

            <button
              onClick={() =>
                deleteReview(review.id)
              }
            >
              Delete Review
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminReviews;