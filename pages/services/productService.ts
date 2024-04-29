import { logger } from "@/src/utils";
import { productRepository } from "../dataRepo/productRepo";

const getProductByIdService = async (productId: string) => {
  try {
    const res: any = await productRepository("GET_PRODUCT_BY_ID", {
      productId,
    });
    return res && res.length > 0 ? res[0] : [];
  } catch (err) {
    console.error("Error fetching products by productId:", err);
    logger.error("Error fetching products by productId", err);
  }
};

const getProductByCategoryService = async (category: string) => {
  try {
    return await productRepository("GET_PRODUCTS_BY_CATEGORY", {
      category,
    });
  } catch (err) {
    console.error("Error fetching products by category:", err);
    logger.error("Error fetching products by category", err);
  }
};

const getAllProductService = async () => {
  try {
    return await productRepository("GET_ALL_PRODUCTS", {});
  } catch (err) {
    console.error("Error fetching products by category:", err);
    logger.error("Error fetching products by category", err);
  }
};

export {
  getProductByIdService,
  getProductByCategoryService,
  getAllProductService,
};
