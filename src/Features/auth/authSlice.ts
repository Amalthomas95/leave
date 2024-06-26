
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
};

type LoginPayload = { username: string, password: string };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<LoginPayload>) => {
      const { username, password } = action.payload;
      if (username === 'admin' && password === 'admin') {
        state.isAuthenticated = true;
        state.userRole = 'admin';
      } else if (username === 'employee' && password === 'employee') {
        state.isAuthenticated = true;
        state.userRole = 'employee';
      } else {
        state.isAuthenticated = false;
        state.userRole = null;
      }
    },
    logout: (state: AuthState) => {
      state.isAuthenticated = false;
      state.userRole = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
