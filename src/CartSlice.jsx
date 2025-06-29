import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    numOfItems: 0
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If it's a new item, add it to the cart with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.numOfItems += 1;
    },
    removeItem: (state, action) => {
        const itemName = action.payload;
        const existingItem = state.items.find(item => item.name === itemName);

        if (existingItem) {
            // Update the total number of items
            state.numOfItems -= existingItem.quantity;
            state.items = state.items.filter(item => item.name !== itemName);
        }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        const differenceQuantity = quantity - existingItem.quantity;
        existingItem.quantity = quantity;

        // Update the total number of items in the cart
        state.numOfItems += differenceQuantity;
    }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;