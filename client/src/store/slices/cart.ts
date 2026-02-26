import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  key?: string; // unique productId,size,color
  _id: string;
  name: string;
  size: string;
  color: string;
  price: string;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { _id, color, name, price, quantity, size, image } = action.payload;
      const key = `${_id}_${size}_${color}`;
      const existingItem = state.items.find((item) => item.key === key);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          key,
          _id,
          color,
          name,
          price,
          quantity,
          size,
          image,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ key: string }>) => {
      const existed = state.items.find(
        (item) => item.key === action.payload.key,
      );
      if (existed) {
        state.items = state.items.filter(
          (item) => item.key !== action.payload.key,
        );
      }
    },

    increaseQuantity: (state, action: PayloadAction<{ key: string }>) => {
      const existingItem = state.items.find(
        (item) => item.key === action.payload.key,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ key: string }>) => {
      const existingItem = state.items.find(
        (item) => item.key === action.payload.key,
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity < 1) {
          state.items = state.items.filter(
            (item) => item.key !== existingItem.key,
          );
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
