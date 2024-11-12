import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toy } from "../../types/Toy";

// Define the initial state structure
interface OrderState {
  orderItems: { product: Toy; quantity: number }[]; // Include quantity for each product
}

const initialState: OrderState = {
  orderItems: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItemToOrder(state, action: PayloadAction<Toy>) {
      const existingItemIndex = state.orderItems.findIndex(
        (item) => item.product._id === action.payload._id
      );

      if (existingItemIndex >= 0) {
        // If the product is already in the cart, increment the quantity
        state.orderItems[existingItemIndex].quantity += 1;
      } else {
        // Otherwise, add the product to the cart with quantity 1
        state.orderItems.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItemFromOrder(state, action: PayloadAction<string>) {
      const index = state.orderItems.findIndex(
        (item) => item.product._id === action.payload
      );
      if (index >= 0) {
        // Decrease the quantity or remove the item entirely if quantity is 1
        if (state.orderItems[index].quantity > 1) {
          state.orderItems[index].quantity -= 1;
        } else {
          state.orderItems.splice(index, 1);
        }
      }
    },
  },
});

export const { addItemToOrder, removeItemFromOrder } = orderSlice.actions;
export default orderSlice.reducer;
