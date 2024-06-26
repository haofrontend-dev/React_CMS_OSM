import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataOrders } from '@/dumy/orders';

export const OrderRedux = {
  Order: 'Order'
};

export const getOrdersAll = createAsyncThunk(
  `${OrderRedux.Order}/get/all`,
  async (_, { rejectWithValue }) => {
    try {
      // const response = await OrderGetAll()
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            metadata: dataOrders
          });
        }, 1000);
      });

      return response.metadata;
    } catch (error) {
      return rejectWithValue({
        errorMessage: 'An error occurred',
        originalError: error
      });
    }
  }
);
