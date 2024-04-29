import React, { useEffect, useState } from "react";
import { ProductCarousel } from "./Carousel";
import Loader from "../../app/infrastucter/utils/Loader";
import { Product } from "@/src/dto/productDto";
import Link from "next/link";

// interface Product {
//   productId: number;
//   title: string;
//   price: number;
//   description: string;
//   categoryName: string;
//   image: string;
//   stock: number;
//   rating: {
//     rate: number;
//   };
// }

const ProductListing = ({ item }: { item: Product[] }) => {
  const [carts, setCarts] = useState<[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const addToCart = (productId: number) => {
    fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      body: JSON.stringify({
        customerId: 2,
        date: new Date().toISOString().split("T")[0], // Current date
        products: [{ productId, quantity: 1 }],
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Product added to cart:", data))
      .catch((error) => console.error("Error adding product to cart:", error));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLoader ? (
        <Loader />
      ) : (
        // <div className="skeleton w-full h-full"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-4  h-auto ">
          {item.map((product) => (
            <div
              // className="overflow-hidden w-full rounded-lg shadow-md bg-white transition-transform transform-gpu hover:scale-110"
              className="overflow-hidden w-full rounded-lg shadow-md bg-white "
              key={product.productId}
            >
              <Link
                href={{
                  pathname: "/product",
                  query: { productId: product.productId },
                }}
              >
                <div className="">
                  <ProductCarousel
                    images={[
                      product.image,
                      "https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
                    ]}
                  />
                </div>
                <div className="p-4 ">
                  <h2 className="text-lg text-gray-700 font-semibold mb-2">
                    {product.title || ""}
                  </h2>
                  <p
                    className="text-gray-700 mb-2 line-clamp-3"
                    style={{ overflowY: "auto", maxHeight: "3rem" }}
                  >
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-gray-700 font-bold">
                      ${product.price}
                    </span>
                    <span className="text-yellow-500">
                      {product.ratingRate} stars
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center ">
                  <button className="block w-full py-2 text-white rounded-md bg-black">
                    Buy Now
                  </button>
                  <button
                    className="block w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mx-4"
                    onClick={() => {
                      console.log("Buy", product);
                      addToCart(product.productId);
                    }}
                  >
                    Add to Cart
                  </button>
                </div> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { ProductListing };
