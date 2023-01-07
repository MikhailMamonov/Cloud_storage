import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import fileSlice from './features/files/fileSlice';
import uploaderSlice from './features/uploader/uploaderSlice';
import appSlice from './features/app/appSlice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    file: fileSlice,
    upload: uploaderSlice,
    app: appSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
