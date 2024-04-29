import { logger } from "@/src/utils";
import crypto from "crypto";
import authQuery from "../dataRepo/authRepo";
import { getToken } from "@/src/utils/helper";

const loginService = async (params) => {
  try {
    const { email, password } = params;
    const response = await authQuery("CHECK_EMAIL", { email });
    const {
      customerId = 0,
      email: userEmail = "",
      password: userPassword,
    } = response?.[0] || {};
    if (customerId) {
      const passwordHashed = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      if (passwordHashed === userPassword) {
        const token = await getToken({ email, customerId });
        authQuery("UPDATE_TOKEN", { token, customerId });
        return [{ isAuthorised: true, token: token, customerId: customerId }];
      } else {
        return [{ Error: "Enter the correct password" }];
      }
    } else {
      return [{ Error: "User not found" }];
    }
  } catch (err) {
    console.log("error in login service: " + err);
    logger.error("error in login service: " + err);
  }
};

const prepareUserData = async (params) => {
  try {
    const { email, insertId } = params;
    const reqParams = { email, customerId: insertId };
    const token = await getToken(reqParams);
    authQuery("UPDATE_TOKEN", { token, customerId: insertId });
    return [{ isAuthorised: true, token: token, customerId: insertId }];
  } catch (err) {
    logger.error("error in prepare user data ", err);
    return [];
  }
};

const createAccService = async (body) => {
  try {
    const { email, password, name } = body;

    // Check if user already exists
    const existingUserResponse = await authQuery("CHECK_EMAIL", { email });
    const { customerId } = existingUserResponse?.[0] || {};
    if (customerId) {
      return [{ Error: "User already exist with same email: " }];
    }

    // Hash the password
    const passwordHashed = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const { insertId = 0 } = (await authQuery("ADD_USER", {
      email,
      passwordHashed,
      name,
    })) as { insertId?: number };

    return prepareUserData({ insertId, email });
  } catch (err) {
    logger.error("Error creating account service: " + err);
    throw err;
  }
};

export { loginService, createAccService };
