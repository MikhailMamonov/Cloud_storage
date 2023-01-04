import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FileState, IFile, ValidationErrors, CreateDirProps } from './types';

import axios from '../../../api';
import { AxiosError } from 'axios';

const initialState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  dirStack: [],
} as FileState;

export const getFiles = createAsyncThunk<
  Array<IFile>,
  string | null,
  {
    rejectValue: ValidationErrors;
  }
>('file/getFiles', async (dirId, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `files${dirId ? '?parent=' + dirId : ''}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const createDir = createAsyncThunk<
  IFile,
  CreateDirProps,
  {
    rejectValue: ValidationErrors;
  }
>('file/createDir', async ({ dirId, name }, { rejectWithValue }) => {
  try {
    console.log(dirId);
    const response = await axios.post(
      `files`,
      {
        name,
        parent: dirId,
        type: 'dir',
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    alert(err.response.data.message);
    return rejectWithValue(error.response.data);
  }
});

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setPopupDisplay: (state, action) => {
      state.popupDisplay = action.payload;
    },
    setCurrentDir: (state, action) => {
      state.currentDir = action.payload;
    },
    pushToStack: (state, action) => {
      state.dirStack.push(action.payload);
      console.log(state.dirStack);
    },
    popFromStack: (state) => {
      state.dirStack.pop();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(getFiles.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(createDir.fulfilled, (state, action) => {
        state.files.push(action.payload);
      })
      .addCase(createDir.rejected, (state, action) => {
        console.log(action);
        alert(action.error.message);
      });
  },
});

export const { setPopupDisplay, setCurrentDir, pushToStack, popFromStack } =
  fileSlice.actions;

export default fileSlice.reducer;
