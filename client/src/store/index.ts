import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
