import { logger } from "@/src/utils";
import { categoryRepository } from "../dataRepo/categoryRepo";

const getCategoriesService = async () => {
  try {
    const categories: any = await categoryRepository("GET_ALL_CATEGORIES", {});
    const categoryList = categories.map(
      (category: { categoryName: string }) => category.categoryName
    );
    return categoryList;
  } catch (err) {
    console.error("Error fetching all categories:", err);
    logger.error("Error fetching all categories", err);
  }
};
export { getCategoriesService };
