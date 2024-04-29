import { logger } from "./logger";
import { regex } from "./regex";
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;

/**
 * Generate a JWT token for the given user data.
 * @param {Object} userData - User data to be included in the token.
 * @param {string} userData.email - The user's email address.
 * @param {number} userData.customerId - The user's customer ID.
 * @returns {string} - JWT token representing the user data.
 * @throws {Error} - Throws an error if there is an issue generating or verifying the token.
 */
const getToken = (userData: { email: string; customerId: number }) => {
  try {
    // Generate a JWT token using the user data and secret key, with an expiration time of 1 minute
    const token = jwt.sign(userData, jwtSecretKey, { expiresIn: "10m" });
    const decoded = jwt.verify(token, jwtSecretKey);
    return token;
  } catch (err) {
    logger.error("Error while generating token", err);
    throw err;
  }
};
/**
 * Validate various types of data.
 * @param {Object} strArrObj - Object containing string arrays to validate.
 * @param {Object} emails - Object containing email strings to validate.
 * @param {Object} numbers - Object containing numbers to validate.
 * @param {Object} passwords - Object containing passwords to validate.
 * @returns {boolean} - True if all data passes validation, false otherwise.
 */
const validate = (
  strArrObj = {},
  emails = {},
  numbers = {},
  passwords = {}
) => {
  let validArray = [];
  Object.values(strArrObj).map((item) => {
    validArray.push(!_.isEmpty(item));
  });
  Object.values(emails).map((item) => {
    validArray.push(item.match(regex.EMAILREGEX));
  });
  Object.values(numbers).map((item) => {
    validArray.push(item > 0);
  });
  Object.values(passwords).map((item) => {
    validArray.push(item.match(regex.PASSWORDREGEX));
  });

  return validArray.every(Boolean);
};

export { getToken, validate };
