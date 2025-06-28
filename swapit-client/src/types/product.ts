import { Category } from "./category";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  condition: "new" | "used";
  quantity?: number;
  category?: Category;
  subCategory?: string;
  createdAt?: string;
  updatedAt?: string;
  seller: string;
}

export interface ProductUpdatePayload {
  price?: number;
  name?: string;
  description?: string;
  quantity?: number;
}