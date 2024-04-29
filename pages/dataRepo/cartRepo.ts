import { connectToDatabase } from "@/src/config/database";
import { logger } from "@/src/utils";

interface Params {
  category?: string;
  productId?: string;
  customerId?: string;
  quantity?: number;
  price?: string;
}

export const cartRepository = async (queryType: string, params: Params) => {
  try {
    const connection = await connectToDatabase();

    let query = "";
    switch (queryType) {
      case "ADD_PRODUCT":
        const { customerId, productId, quantity, price } = params;
        query =
          query +
          `INSERT INTO cart (customerId, productId, quantity, price) VALUES (${customerId}, ${productId}, ${quantity}, ${price})`;
        console.log(query);
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
    logger.error("Error in cart repository ", err);
    throw err;
  }
};
