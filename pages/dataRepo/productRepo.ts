import { connectToDatabase } from "@/src/config/database";
import { logger } from "@/src/utils";

interface Params {
  category?: string;
  productId?: string;
}

export const productRepository = async (queryType: string, params: Params) => {
  try {
    const connection = await connectToDatabase();

    let query = "";

    switch (queryType) {
      case "GET_PRODUCT_BY_ID":
        const { productId } = params;
        query =
          query +
          `select * from product p left join category c on c.categoryId = p.categoryId where p.productId = "${productId}"`;
        break;
      case "GET_PRODUCTS_BY_CATEGORY":
        const { category } = params;
        query =
          query +
          `select * from product p left join category c on c.categoryId = p.categoryId where c.categoryName = "${category}"`;
        break;
      case "GET_ALL_PRODUCTS":
        query = query + `select * from product `;
        break;
      default:
        break;
    }

    return new Promise((resolve, reject) => {
      connection.query(query, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Close the connection after executing the query
          connection.end((endErr) => {
            if (endErr) {
              reject(endErr);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  } catch (err) {
    logger.error("Error in product repository ", err);
    throw err;
  }
};
