import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toy } from "../../types/Toy";
import { OrderItem } from "../../types/OrderItem";

interface OrderState {
  orderItems: OrderItem[];
}

const initialState: OrderState = {
  orderItems: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItemToOrder: (state, action: PayloadAction<Toy>) => {
      const existingItem = state.orderItems.find(
        (item) => item.toy._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.orderItems.push({ toy: action.payload, quantity: 1 });
      }
    },
    removeItemFromOrder: (state, action: PayloadAction<string>) => {
      const index = state.orderItems.findIndex(
        (item) => item.toy._id === action.payload
      );
      if (index !== -1) {
        state.orderItems.splice(index, 1);
      }
    },
    clearOrder: (state) => {
      state.orderItems = [];
    },
  },
});

// Export actions
export const { addItemToOrder, removeItemFromOrder, clearOrder } =
  orderSlice.actions;

// Export reducer
export default orderSlice.reducer;
