/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/src/dto/productDto";
import { getProductById } from "@/src/apiCalls/productApiCalls";
import Loader from "../infrastucter/utils/Loader";
import { useSearchParams } from "next/navigation";
import { constatnt } from "@/src/utils/constants";
import HeroSection from "@/src/componets/HeroProduct";
const { PRODUCTOBJ } = constatnt;

const ProductDetailsPage = () => {
  const [isShowLoading, setIsShowLoading] = useState<Boolean>(true);
  const [product, setProduct] = useState<Product>(PRODUCTOBJ);

  const searchParams = useSearchParams();

  const fetchProductDetails = async (productId: string) => {
    try {
      const data: Product = await getProductById(productId);
      setIsShowLoading(false);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const readParams = () => {
    const id: string = searchParams?.get("productId") || "0";
    fetchProductDetails(id);
  };

  const handleAddToCart = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      isProductAddedToCart: !prevProduct.isProductAddedToCart,
    }));
  };
  console.log("product info", product);

  useEffect(() => {
    readParams();
  }, []);

  return (
    <div>
      {isShowLoading ? (
        <Loader />
      ) : (
        <div>
          {/* <HeroSection product={product} /> */}
          <div className="flex justify-center items-center px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row md:space-x-8 w-full md:max-w-5xl">
              <div className="md:w-1/2 ">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full md:rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {product.title}
                </h1>
                <p className="text-lg font-semibold mb-4">${product.price}</p>
                <p className="text-base mb-4">{product.description}</p>
                <div className="flex items-center mb-4">
                  <p className="text-lg font-semibold mr-2">Rating:</p>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-2xl mr-1 ${
                          index < Math.floor(product.ratingRate)
                            ? "text-yellow-500"
                            : "text-grey-900"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <p className="mr-4">
                    <span className="font-semibold">Category:</span>{" "}
                    {product.categoryName}
                  </p>
                  <p className="mr-4">
                    <span className="font-semibold">Stock:</span>{" "}
                    {product.stock}
                  </p>
                  <p>
                    <span className="font-semibold">Rating:</span>{" "}
                    {product.ratingRate}
                  </p>
                </div>
                <button
                  className={`bg-blue-500 text-white px-6 py-3 rounded-md mr-4 ${
                    product.isProductAddedToCart && "bg-red-500"
                  }`}
                  onClick={handleAddToCart}
                >
                  {product.isProductAddedToCart
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-md">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
