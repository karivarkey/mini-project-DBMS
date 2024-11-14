export interface Order {
  _id: string;
  userId: string;
  products: any[]; // Adjust this type if you know the structure of the products array
  price: {
    individualPrices: number[];
    shipping: number;
    total: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  ETA: string;
  status: string;
  manufacturers: any[]; // Adjust this type if manufacturers have a specific structure
  __v: number;
}
