import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
};

export const cartFoodSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }

      state.totalItems = state.items.reduce(
        (total, i) => total + i.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      state.totalItems = state.items.reduce(
        (total, i) => total + i.quantity,
        0
      );
    },

    decreaseItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((i) => i.id === id);

      if (existingItem) {
        existingItem.quantity -= 1;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }

      state.totalItems = state.items.reduce(
        (total, i) => total + i.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseItem, clearCart } =
  cartFoodSlice.actions;

export default cartFoodSlice.reducer;
