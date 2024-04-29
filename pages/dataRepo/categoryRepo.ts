import { connectToDatabase } from "@/src/config/database";
import { logger } from "@/src/utils";

export const categoryRepository = async (queryType: string, params: {}) => {
  try {
    const connection = await connectToDatabase();

    let query = "";
    switch (queryType) {
      case "GET_ALL_CATEGORIES":
        query = query + `select categoryName from category`;
        break;
      default:
        break;
    }

    return new Promise((resolve, reject) => {
      connection.query(query, params, (err: any, result: []) => {
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
    logger.error("Error in category repository ", err);
    throw err;
  }
};
