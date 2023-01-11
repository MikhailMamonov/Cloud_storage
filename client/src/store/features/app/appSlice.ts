import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomError, UserState } from '../../types/app';

const initialState = {
  loader: false,
  error: null,
} as UserState;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loader = true;
    },
    hideLoader: (state) => {
      state.loader = false;
    },
    setError: (state, action: PayloadAction<AxiosError<CustomError, any>>) => {
      const err = action.payload;
      if (!err.response) {
        state.error = {
          message: err.message,
          stackTrace: err.stack,
        } as CustomError;
      } else {
        state.error = err.response.data;
      }
    },
  },
});

export const { showLoader, hideLoader, setError } = appSlice.actions;

export default appSlice.reducer;
