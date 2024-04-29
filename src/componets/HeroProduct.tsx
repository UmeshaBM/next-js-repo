import React from "react";

const HeroSection = ({ product }) => {
  return (
    <div className="product-hero">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <div className="rating">
          {[...Array(Math.floor(product.ratingRate))].map((_, index) => (
            <span key={index} className="star">
              ★
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        .product-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          margin-bottom: 20px;
          //   background-color: #f5f5f5;
          border-radius: 5px;
        }

        .product-image {
          flex: 1;
          width: 400px;
          height: auto;
          object-fit: cover;
        }

        .product-details {
          flex: 2;
        }

        .price {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 10px;
        }

        .rating {
          display: flex;
          align-items: center;
        }

        .star {
          font-size: 1.2rem;
          color: gold;
          margin-right: 5px;
        }

        @media only screen and (max-width: 768px) {
          /* Responsive adjustments for smaller screens */
          .product-hero {
            flex-direction: column;
            align-items: center;
          }

          .product-image {
            width: 100%;
            margin-bottom: 10px;
          }

          .product-details {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
