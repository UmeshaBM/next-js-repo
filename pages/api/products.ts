import { NextApiRequest, NextApiResponse } from "next";
import {
  getAllProductService,
  getProductByCategoryService,
  getProductByIdService,
} from "../services/productService";
import { logger } from "@/src/utils";

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

  try {
    switch (method) {
      case "GET":
        let data: any = [];
        switch (true) {
          case !!category:
            data = await getProductByCategoryService(category);
            break;
          case !!productId:
            data = await getProductByIdService(productId);
            break;
          default:
            data = await getAllProductService();
            break;
        }
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
