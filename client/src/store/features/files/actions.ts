import { UploadedFile } from './../uploader/types/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IFile,
  ValidationErrors,
  CreateDirProps,
  UploadFileProps,
  GetFilesProps,
} from './types';

import axios from '../../../api';
import { AxiosError } from 'axios';
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from '../uploader/uploaderSlice';
import { hideLoader, showLoader } from '../app/appSlice';
import { setUser } from '../auth/authSlice';

export const getFiles = createAsyncThunk<
  Array<IFile>,
  GetFilesProps,
  {
    rejectValue: ValidationErrors;
  }
>('file/getFiles', async ({ dirId, sort }, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    let url = ``;
    if (dirId) {
      url = `?parent=${dirId}`;
    }
    if (sort) {
      url = `?sort=${sort}`;
    }
    if (dirId && sort) {
      url = `?parent=${dirId}&sort=${sort}`;
    }
    const response = await axios.get(`files${url}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return thunkAPI.rejectWithValue(error.response.data);
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});

export const createDir = createAsyncThunk<
  IFile,
  CreateDirProps,
  {
    rejectValue: ValidationErrors;
  }
>('file/createDir', async ({ dirId, name }, thunkAPI) => {
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

    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const uploadFile = createAsyncThunk<
  IFile,
  UploadFileProps,
  {
    rejectValue: ValidationErrors;
  }
>('file/uploadFile', async ({ file, dirId }, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (dirId) {
      formData.append('parent', dirId);
    }

    const uploadedFile = {
      name: file.name,
      progress: 0,
      id: Date.now(),
    } as UploadedFile;
    thunkAPI.dispatch(showUploader());
    thunkAPI.dispatch(addUploadFile(uploadedFile));

    const response = await axios.post(`files/upload`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      onUploadProgress: (progressEvent) => {
        console.log('total', progressEvent.total);
        if (progressEvent.total) {
          uploadedFile.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          thunkAPI.dispatch(changeUploadFile(uploadedFile));
        }
      },
    });
    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const downloadFile = async (file: IFile) => {
  await fetch(`http://localhost:8080/api/files/download?id=${file._id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
    .then(async (response) => {
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        return Promise.reject(await response.json());
      }
    })
    .catch((err) => {
      console.log(err.message);
      alert(err.message);
    });
};

export const searchFiles = createAsyncThunk<
  IFile[],
  string,
  {
    rejectValue: ValidationErrors;
  }
>('file/searchFiles', async (search, thunkAPI) => {
  try {
    const response = await axios.get(`files/search?search=${search}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return thunkAPI.rejectWithValue(error.response.data);
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});

export const deleteFile = createAsyncThunk<
  string,
  IFile,
  {
    rejectValue: ValidationErrors;
  }
>('file/deleteFile', async (file, thunkAPI) => {
  try {
    const response = await axios.delete(`files?id=${file._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    alert(response.data.message);
    return file._id;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const uploadAvatar = createAsyncThunk<
  void,
  File,
  {
    rejectValue: ValidationErrors;
  }
>('file/uploadAvatar', async (file, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`files/avatar`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    alert(response.data.message);
    thunkAPI.dispatch(setUser(response.data));
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteAvatar = createAsyncThunk<
  void,
  void,
  {
    rejectValue: ValidationErrors;
  }
>('file/uploadAvatar', async (_: void, thunkAPI) => {
  try {
    const response = await axios.delete(`files/avatar`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    thunkAPI.dispatch(setUser(response.data));
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }

    return thunkAPI.rejectWithValue(error.response.data);
  }
});
