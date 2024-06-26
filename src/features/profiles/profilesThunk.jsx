import { profileGetAll } from '@/api/profileApi';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const ProfileRedux = {
 Profile: 'Profile'
};

export const getProfileAll = createAsyncThunk(
  `${ProfileRedux.Profile}/get/all`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileGetAll();
      return response.metadata;
    } catch (error) {
      return rejectWithValue({
        errorMessage: 'An error occurred',
        originalError: error
      });
    }
  }
);
