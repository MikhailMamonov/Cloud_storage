import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types/app';

const initialState = {
  loader: false,
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
  },
});

export const { showLoader, hideLoader } = appSlice.actions;

export default appSlice.reducer;
