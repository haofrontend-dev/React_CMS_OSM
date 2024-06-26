

import { createSlice } from '@reduxjs/toolkit';
import { ProfileRedux, getProfileAll } from '@/features/profiles/profilesThunk';

const initialState = {
  isLoading: false,
  error: null,
  dataProfile: null
};

const profileSlice = createSlice({
  name: ProfileRedux.Profile,
  initialState,
  reducers: {
    clearAllInit: state => {
      state.isLoading = false;
      state.error = null;
      state.dataProfile = null;
    }
  },
  extraReducers: builder => {
    //* Login
    builder.addCase(getProfileAll.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(getProfileAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataProfile = action.payload;
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

export const { clearAllInit } = profileSlice.actions;

export default profileSlice.reducer;
