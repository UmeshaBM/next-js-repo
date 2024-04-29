import { logger } from "@/src/utils";
import { cartRepository } from "../dataRepo/cartRepo";
import { productRepository } from "../dataRepo/productRepo";

const addToCartService = async (reqBody) => {
  try {
    const {
      customerId,
      addToCartProductId,
      quantity = 1,
    } = reqBody as {
      customerId: string;
      quantity: number;
      addToCartProductId: string;
    };
    console.log(reqBody);
    const productResponse = await productRepository("GET_PRODUCT_BY_ID", {
      productId: addToCartProductId,
    });

    const { productId, stock = 0, price } = productResponse?.[0] || {};

    if (stock >= quantity) {
      const req = await cartRepository("ADD_PRODUCT", {
        customerId,
        productId,
        quantity,
        price,
      });
      console.log("after update", req);
    }
    console.log(stock >= quantity, stock, quantity);
  } catch (err) {
    console.error("Error while adding products to cart", err);
    logger.error("Error while adding products to cart: ", err);
  }
};

export { addToCartService };
