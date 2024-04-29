import { connectToDatabase } from "@/src/config/database";
import { logger } from "@/src/utils";

interface QueryParams {
  email?: string;
  token?: string;
  customerId?: string;
  passwordHashed?: string;
  name?: string;
}

const authQuery = async (queryType: string, params: QueryParams) => {
  try {
    const connection = await connectToDatabase();

    let query: string = "";
    switch (queryType) {
      case "CHECK_EMAIL":
        const { email } = params;
        query = query + `select * from customer where email like '${email}'`;
        break;
      case "UPDATE_TOKEN":
        const { customerId, token } = params;
        query =
          query +
          `update customer set token = '${token}' where customerId = ${customerId}`;
        break;
      case "ADD_USER":
        const { email: newEmail, name, passwordHashed } = params;
        query =
          query +
          `insert into customer (email, password, name) values ("${newEmail}", "${passwordHashed}", "${name}") ;`;
        break;
      default:
        break;
    }
    return new Promise((resolve, reject) => {
      connection.query(query, params, (err: any, result: unknown) => {
        if (err) {
          reject(err);
        } else {
          connection.end((error: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  } catch (err) {
    logger.error("Error in auth repository ", err);
    throw err;
  }
};

export default authQuery;
