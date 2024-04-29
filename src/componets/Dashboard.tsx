"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/src/dto/productDto";
import Loader from "@/app/infrastucter/utils/Loader";
import { ProductCarousel } from "./Carousel";
import Link from "next/link";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleClick = (product) => {};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Hero section */}
          <section className="bg-gray-800 text-white py-10 px-4">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
              <p className="text-lg">Explore our wide range of products</p>
            </div>
          </section>

          {/* Product carousel */}
          <section className="py-10">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
              <ProductCarousel
                images={[
                  "https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
                  "https://plus.unsplash.com/premium_photo-1711508489210-80940a5bf60a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
                ]}
              />
            </div>
          </section>

          {/* Picture template */}
          <section className="bg-gray-200 py-10 ">
            <div className="container mx-auto grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 ">
              {products.slice(5, 17).map((product) => (
                <div
                  key={product.productId}
                  className="overflow-hidden rounded-lg shadow-md bg-white transition-transform transform-gpu hover:scale-110 "
                  style={{ maxHeight: "rem" }}
                >
                  <Link
                    href={{
                      pathname: "/product",
                      query: { productId: product.productId },
                    }}
                  >
                    {/* <Link href={`/product/${product.productId}`}>
                    <a onClick={() => handleClick(product)}>{product.title}</a> */}

                    <div>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-1/2"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-700 text-lg font-semibold mb-2">
                        {product.title}
                      </h3>
                      {/* <p
                      className="text-gray-700 "
                      style={{ maxHeight: "10%", overflowY: "auto" }}
                    >
                      {product.description}
                    </p> */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700  text-xl font-bold">
                          ${product.price}
                        </span>
                        <span className="text-yellow-500">
                          {product.ratingRate} stars
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
