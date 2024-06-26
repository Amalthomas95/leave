

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/auth/authSlice';
import leaveReducer from '../Features/leave/leaveslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
