import { VehicleRedux, getVehicleAll } from '@/features/vehicle/vehicleThunk';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  dataVehicle: null
};

const vehicleSlice = createSlice({
  name: VehicleRedux.Vehicle,
  initialState,
  reducers: {
    clearAllInit: state => {
      state.isLoading = false;
      state.error = null;
      state.dataVehicle = null;
    }
  },
  extraReducers: builder => {
    //* Login
    builder.addCase(getVehicleAll.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(getVehicleAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataVehicle = action.payload;
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

export const { clearAllInit } = vehicleSlice.actions;

export default vehicleSlice.reducer;
