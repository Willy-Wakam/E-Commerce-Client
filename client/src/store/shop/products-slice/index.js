import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    products: []
}

export const fetchAllFilteredProducts = createAsyncThunk(
  "admin/products/fetchFilteredProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/shop/products/get",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data || !response.data.success) {
        throw new Error("Failed to add product");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data
              })
              .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.products = action.payload || [];
              })
    }
})

export const shoppingProductsReducer = shoppingProductsSlice.reducer;