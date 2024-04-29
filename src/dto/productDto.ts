export interface Product {
  productId: number;
  title: string;
  price: number;
  description: string;
  categoryName: string;
  image: string;
  stock: number;
  ratingRate: number;
  isProductAddedToCart?: boolean;
}
