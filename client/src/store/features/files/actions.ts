import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IFile,
  ValidationErrors,
  CreateDirProps,
  UploadFileProps,
} from './types';

import axios from '../../../api';
import { AxiosError } from 'axios';

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

export const uploadFile = createAsyncThunk<
  IFile,
  UploadFileProps,
  {
    rejectValue: ValidationErrors;
  }
>('file/uploadFile', async ({ file, dirId }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (dirId) {
      formData.append('parent', dirId);
    }

    const response = await axios.post(`files/upload`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      onUploadProgress: (progressEvent) => {
        console.log('total', progressEvent.total);
        if (progressEvent.total) {
          let progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(progress);
        }
      },
    });
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
