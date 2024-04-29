const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`/api/products?category=${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products by category ${category}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products by category ${category}:`, error);
    return [];
  }
};

const getProductById = async (productId: string) => {
  try {
    const response = await fetch(`/api/products?productId=${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product by productId ${productId}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching products by productId ${productId}:`, error);
    return [];
  }
};

export { getProductsByCategory, getProductById };
