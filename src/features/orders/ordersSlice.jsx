import { OrderRedux, getOrdersAll } from '@/features/orders/ordersThunk';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  dataOrders: null
};

const ordersSlice = createSlice({
  name: OrderRedux.Order,
  initialState,
  reducers: {
    clearAllInit: state => {
      state.isLoading = false;
      state.error = null;
      state.dataOrders = null;
    }
  },
  extraReducers: builder => {
    //* Login
    builder.addCase(getOrdersAll.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(getOrdersAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataOrders = action.payload;
    });

    builder.addMatcher(
      action => action.type.endsWith('/rejected'),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  }
});

export const { clearAllInit } = ordersSlice.actions;

export default ordersSlice.reducer;
