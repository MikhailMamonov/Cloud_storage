import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  RegistrationPayload,
  RegistrationProps,
  LoginPayload,
  LoginProps,
} from '../types/auth';
import axios from 'api';
import { setError } from 'store/features/app/appSlice';

export const registration = createAsyncThunk<
  RegistrationPayload,
  RegistrationProps
>('auth/registration', async ({ email, password }, thunkAPI) => {
  try {
    const resporse = await axios.post('auth/registration', { email, password });
    return resporse.data;
  } catch (e: any) {
    thunkAPI.dispatch(setError(e));
    throw e;
  }
});

export const login = createAsyncThunk<LoginPayload, LoginProps>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const resporse = await axios.post('auth/login', { email, password });
      return resporse.data;
    } catch (e: any) {
      thunkAPI.dispatch(setError(e));
      throw e;
    }
  }
);

export const auth = createAsyncThunk<LoginPayload>(
  'auth/',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (e: any) {
      if (e.response.status !== 401) {
        thunkAPI.dispatch(setError(e));
        throw e;
      }
    }
  }
);
