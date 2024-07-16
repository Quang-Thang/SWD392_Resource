import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload.productId._id);
      const item = state.items.find(
        (item) => item.productId._id === action.payload.productId._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId._id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId._id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
