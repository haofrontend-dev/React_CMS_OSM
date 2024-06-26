import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderGetAll } from '@/api/orderApi';

export const OrderRedux = {
  Order: 'Order'
};

export const getOrdersAll = createAsyncThunk(
  `${OrderRedux.Order}/get/all`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await OrderGetAll()
      return response.metadata;
    } catch (error) {
      return rejectWithValue({
        errorMessage: 'An error occurred',
        originalError: error
      });
    }
  }
);
