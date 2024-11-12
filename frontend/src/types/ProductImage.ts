// src/types/ProductImage.ts

// Type for each image entry in the `images` array
export interface Image {
  url: string;
  publicID: string;
}

// Type for ProductImage
export interface ProductImage {
  _id: string; // Mongoose ObjectId as a string
  productID: string; // Reference to Toy by ObjectId as a string
  images: Image[];
  __v?: number; // Optional version key added by Mongoose
}
