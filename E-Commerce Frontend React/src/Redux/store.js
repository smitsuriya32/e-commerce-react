import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Reducers/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
