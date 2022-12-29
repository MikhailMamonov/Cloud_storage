import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from './types/User';
import axios from '../../../api';
import { AxiosError } from 'axios';
interface AuthState {
  user: User | null;
  token: string;
  isAuth: boolean;
  isLoading: boolean;
  status: string;
  errors: Array<string>;
}

export interface RegistrationProps {
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

interface ValidationErrors {
  message: string;
  errors: Array<string>;
}

interface RegistrationPayload {
  user: User;
  token: string;
  message: string;
}

interface LoginPayload {
  user: User;
  token: string;
  message: string;
}

const initialState = {
  user: null,
  token: '',
  isLoading: false,
  status: '',
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
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = action.payload.message;
      })
      .addCase(registration.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registration.rejected, (state, action) => {
        state.errors = action.payload!.errors;
        state.status = action.payload!.message;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('token', action.payload.token);
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = action.payload.message;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.errors = action.payload!.errors;
        state.status = action.payload!.message;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
