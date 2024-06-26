import { UserGetAll } from '@/api/userApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const UsersRedux = {
  User: 'User'
};

export const getUsersAll = createAsyncThunk(
  `${UsersRedux.User}/get/all`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserGetAll();
      return response.metadata;
    } catch (error) {
      return rejectWithValue({
        errorMessage: 'An error occurred',
        originalError: error
      });
    }
  }
);
