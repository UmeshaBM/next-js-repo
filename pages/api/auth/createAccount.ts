import { createAccService } from "@/pages/services/authService";
import { logger } from "@/src/utils";
import { validate } from "@/src/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req as { method: string };
    const { body } = req as { body: {} };

    let data;
    const { email, password } = body as { email: string; password: string };
    const isValid = await validate({}, { email }, {}, { password });
    console.log("valid", isValid);
    if (!isValid) {
      res.status(400).json({ message: "please check the payload" });
      return;
    }
    console.log("after valid");
    switch (method) {
      case "POST":
        data = await createAccService(body);
        res.status(200).send(data);
        break;
      default:
        res.status(404).json({ Error: "Invalid method" });
        break;
    }
  } catch (err) {
    console.log("Error: error while create user account route", err);
    logger.error("Error: error while creating user account route: " + err);
    res
      .status(500)
      .json({ Error: "Internal Server Error", ErrorMsg: err.message });
  }
}
