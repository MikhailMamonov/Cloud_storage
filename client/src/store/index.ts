import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import fileSlice from './features/files/fileSlice';
import uploaderSlice from './features/uploader/uploaderSlice';
const store = configureStore({
  reducer: { auth: authSlice, file: fileSlice, upload: uploaderSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
