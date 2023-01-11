import { UploadedFile } from '../../types/uploader';
import { createSlice } from '@reduxjs/toolkit';
import { UploaderState } from '../../types/uploader';

const initialState = {
  isVisible: false,
  files: [],
} as UploaderState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showUploader: (state) => {
      state.isVisible = true;
    },
    hideUploader: (state) => {
      state.isVisible = false;
    },
    addUploadFile: (state, action) => {
      state.files = [...state.files, { ...action.payload } as UploadedFile];
    },
    removeUploadFile: (state, action) => {
      state.files = [
        ...state.files.filter((file) => file.id != action.payload),
      ];
    },
    changeUploadFile: (state, action) => {
      state.files = [
        ...state.files.map((file) =>
          file.id == action.payload.id
            ? { ...file, progress: action.payload.progress }
            : { ...file }
        ),
      ];
    },
  },
});

export const {
  showUploader,
  removeUploadFile,
  addUploadFile,
  hideUploader,
  changeUploadFile,
} = authSlice.actions;

export default authSlice.reducer;
