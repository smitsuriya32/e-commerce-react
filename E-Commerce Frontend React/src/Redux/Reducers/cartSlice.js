import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Thunk to fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const bearer_token = `Bearer ${token}`;

      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/cart/getMyCart`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: bearer_token,
          },
        }
      );

      return response.data.data.items;
    } catch (error) {
      console.error("Error in fetching cart:", error);
      toast.error("Error in fetching cart 🥱");
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const bearer_token = `Bearer ${token}`;

      const response = await axios.post(
        `http://127.0.0.1:5000/api/v1/cart/addToCart`,
        { productId, userId: user },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: bearer_token,
          },
        }
      );

      toast.success(response.data.message);
      return response.data.data.items;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart");
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const bearer_token = `Bearer ${token}`;

      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/cart/removeFromCart/${productId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: bearer_token,
          },
        }
      );

      toast.success(response.data.message);
      return response.data.data.items;
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Error removing product from cart 🥱");
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const bearer_token = `Bearer ${token}`;

      const response = await axios.post(
        `http://127.0.0.1:5000/api/v1/cart/clearCart`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: bearer_token,
          },
        }
      );

      // toast.success(response.data.message);
      return [];
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Error clearing cart");
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of cart items
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
