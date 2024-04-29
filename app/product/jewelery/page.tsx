"use client";
import { getProductsByCategory } from "@/src/apiCalls/productApiCalls";
import { ProductListing } from "@/src/componets/ProductListing";
import { Product } from "@/src/dto/productDto";
import React, { useState, useEffect } from "react";

const JeweleryProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const selectedCategory = "jewelery";
      const data: Product[] = await getProductsByCategory(selectedCategory);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <ProductListing item={products} />;
};

export default JeweleryProductPage;
