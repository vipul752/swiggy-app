import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      saveCartToLocalStorage(state.items);
    },
    removeItems: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items.length = 0;
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addItem, removeItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
