import { Category } from './category.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  created_at: Date;
  categories?: Category; // Add this line to include the joined category data
}