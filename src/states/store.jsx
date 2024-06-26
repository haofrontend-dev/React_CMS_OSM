import loggerMiddleware from 'redux-logger';

import { APP_NODE } from '@/constants/appConstants';
import authSlice from '@/features/auth/authSlice';
import vehicleSlice from '@/features/vehicle/vehicleSlice';
import OrderSlice from '@/features/orders/ordersSlice';
import UserSlice from '@/features/users/usersSlice';


import { configureStore } from '@reduxjs/toolkit';
import profileSlice from '@/features/profiles/profileSlice';

const shouldEnvironment = process.env.NODE_APP === APP_NODE.dev;

const middlewares = [];

if (shouldEnvironment) {
  middlewares.push(loggerMiddleware);
}

export const store = configureStore({
  reducer: {
    auth: authSlice,
    vehicle: vehicleSlice,
    orders: OrderSlice,
    users: UserSlice,
    profile:profileSlice,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
  devTools: shouldEnvironment
});
