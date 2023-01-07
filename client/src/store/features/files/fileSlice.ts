import { createSlice } from '@reduxjs/toolkit';
import { FileState } from './types';

import {
  createDir,
  getFiles,
  uploadFile,
  deleteFile,
  searchFiles,
} from './actions';

const initialState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  dirStack: [],
  view: 'list',
} as FileState;

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
    setFileView: (state, action) => {
      state.view = action.payload;
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
        alert(action.error.message);
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = [
          ...state.files.filter((file) => file._id != action.payload),
        ];
      })
      .addCase(deleteFile.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(searchFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(searchFiles.rejected, (state, action) => {
        alert(action.error.message);
      });
  },
});

export const {
  setPopupDisplay,
  setCurrentDir,
  pushToStack,
  popFromStack,
  setFileView,
} = fileSlice.actions;

export default fileSlice.reducer;
