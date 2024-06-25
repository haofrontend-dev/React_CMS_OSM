import { AuthLogin } from '@/api/authApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const AuthRedux = {
  Auth: 'auth'
};

export const loginUser = createAsyncThunk(
  `${AuthRedux.Auth}/login`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthLogin({
        email: data.email,
        password: data.password
      })

      return response 
    } catch (error) {
      return rejectWithValue({
        errorMessage: 'An error occurred',
        originalError: error
      });
    }
  }
);

