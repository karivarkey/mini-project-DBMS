// src/types/Toy.ts

// Import Manufacturer and ProductImage interfaces
import { Manufacturer } from "./Manufacturer";
import { ProductImage } from "./ProductImage";

// Type for the category field
export interface Category {
  type: string;
  features: string[];
}

// Type for the popularity field
export interface Popularity {
  views: number;
  purchases: number;
}

// Main Toy type
export interface Toy {
  _id: string; // Mongoose ObjectId as a string
  productName: string;
  manufacturer: Manufacturer; // Can be the full Manufacturer object or just its ID
  price: number;
  category: Category;
  ageGroup: [number, number]; // Tuple for age range [lowerLimit, upperLimit]
  stockLeft: number;
  popularity: Popularity;
  productImages: ProductImage[]; // Array of ProductImage objects (references or populated)
  __v?: number; // Optional version key field,
  description: string;
}
