import { NextApiRequest, NextApiResponse } from "next";
import { getCategoriesService } from "../services/categoryService";
import { logger } from "@/src/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req as { method: string };

  try {
    if (method === "GET") {
      const data = await getCategoriesService();
      res.status(200).send(data);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    logger.error("Error fetching category route", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
