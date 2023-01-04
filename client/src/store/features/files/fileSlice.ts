import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FileState, IFile, ValidationErrors } from './types';

import axios from '../../../api';
import { AxiosError } from 'axios';

const initialState = {
  files: [],
  currentDir: '',
} as FileState;

export const getFiles = createAsyncThunk<
  Array<IFile>,
  string,
  {
    rejectValue: ValidationErrors;
  }
>('auth/registration', async (dirId, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `files${dirId ? '?parent=' + dirId : ''}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(getFiles.rejected, (state, action) => {
        alert(action.error.message);
      });
  },
});

export default fileSlice.reducer;
