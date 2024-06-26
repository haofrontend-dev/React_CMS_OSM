import { VehicleGetAll } from '@/api/vehicleApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const VehicleRedux = {
  Vehicle: 'vehicle'
};

export const getVehicleAll = createAsyncThunk(
  `${VehicleRedux.Vehicle}/get/all`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await VehicleGetAll()

      return response.metadata
    } catch (error) {
      return rejectWithValue({
        errorMessage: 'An error occurred',
        originalError: error
      });
    }
  }
);

