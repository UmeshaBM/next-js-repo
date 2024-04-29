"use client";
import { getProductsByCategory } from "@/src/apiCalls/productApiCalls";
import { ProductListing } from "@/src/componets/ProductListing";
import { Product } from "@/src/dto/productDto";
import React, { useState, useEffect } from "react";

const MenProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const selectedCategory = "men's clothing";
      const data: Product[] = await getProductsByCategory(selectedCategory);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductListing item={products} />
    </div>
  );
};

export default MenProductPage;
