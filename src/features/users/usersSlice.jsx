import { UsersRedux, getUsersAll } from '@/features/users/usersThunk';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  dataUsers: null
};

const usersSlice = createSlice({
  name: UsersRedux.User,
  initialState,
  reducers: {
    clearAllInit: state => {
      state.isLoading = false;
      state.error = null;
      state.dataUsers = null;
    }
  },
  extraReducers: builder => {
    //* Login
    builder.addCase(getUsersAll.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(getUsersAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataUsers = action.payload;
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

export const { clearAllInit } = usersSlice.actions;

export default usersSlice.reducer;
