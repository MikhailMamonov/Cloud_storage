import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  AuthState,
  RegistrationPayload,
  RegistrationProps,
  LoginPayload,
  LoginProps,
  ValidationErrors,
} from './types';
import axios from '../../../api';
import { AxiosError } from 'axios';

const initialState = {
  user: null,
} as AuthState;

export const registration = createAsyncThunk<
  RegistrationPayload,
  RegistrationProps,
  {
    rejectValue: ValidationErrors;
  }
>('auth/registration', async ({ email, password }, { rejectWithValue }) => {
  try {
    const resporse = await axios.post('auth/registration', { email, password });
    return resporse.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk<
  LoginPayload,
  LoginProps,
  {
    rejectValue: ValidationErrors;
  }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const resporse = await axios.post('auth/login', { email, password });
    return resporse.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    alert(err.response.data.message);
    return rejectWithValue(error.response.data);
  }
});

export const auth = createAsyncThunk<LoginPayload>('auth/', async () => {
  try {
    const response = await axios.get(`auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (e: any) {
    alert(e.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('token');
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
