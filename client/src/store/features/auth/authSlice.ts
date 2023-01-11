import { createSlice } from '@reduxjs/toolkit';
import { auth, login, registration } from 'store/actions/auth';

import { AuthState } from 'store/types/auth';

const initialState = {
  user: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(auth.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(auth.rejected, (state, action) => {
        localStorage.removeItem('token');
        state.isAuth = false;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
