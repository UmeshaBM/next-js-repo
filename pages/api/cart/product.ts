import { NextApiRequest, NextApiResponse } from "next";

import { logger } from "@/src/utils";
import { addToCartService } from "@/pages/services/cartService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Access query parameters
  const { category, productId } = req.query as {
    category: string;
    productId: string;
  };
  const { method } = req as { method: string };
  let data: any = [];
  try {
    switch (method) {
      case "POST":
        //add product to cart
        const { customerId, addToCartProductId, quantity } = req.body as {
          customerId: string;
          quantity: number;
          addToCartProductId: string;
        };
        data = await addToCartService(req.body);
        res.status(200).send(data);
        break;

      default:
        res.status(405).json({ error: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    logger.error("Error fetching category route: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
