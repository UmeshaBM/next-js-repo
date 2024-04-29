import React, { useState } from "react";

interface ProductCarouselProps {
  images: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <img
        src={images[currentImageIndex]}
        alt={`Product Image ${currentImageIndex + 1}`}
        className="w-full rounded-lg shadow-md"
      />
      {images.length && images.length !== 1 && (
        <div>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
            onClick={prevImage}
          >
            {"<"}
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
            onClick={nextImage}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export { ProductCarousel };
