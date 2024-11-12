// src/types/Manufacturer.ts

export interface Manufacturer {
  _id: string; // Mongoose ObjectId as a string
  uid: string;
  address: string;
  contact: string;
  email: string;
  manufacturerName: string;
  gstin: string;
  __v?: number; // Optional version key added by Mongoose
}
