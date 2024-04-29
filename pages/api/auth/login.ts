import { loginService } from "@/pages/services/authService";
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
    if (!isValid) {
      res.status(400).json({ message: "please check the payload" });
      return;
    }
    switch (method) {
      case "POST":
        data = await loginService(body);
        res.status(200).send(data);
        break;
      default:
        res.status(404).json({ Error: "Invalid method" });
        break;
    }
  } catch (err) {
    console.error(err);
    logger.error(`Error: erroro while login route `, err);
    res
      .status(500)
      .json({ Error: "Internal server error", ErrorMsg: err.message });
  }
}
