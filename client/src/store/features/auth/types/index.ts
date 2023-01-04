import { IFile } from '../../files/types';

export interface User {
  id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string;
  files: Array<IFile>[];
}

export interface AuthState {
  user: User | null;
  isAuth: boolean;
}

export interface RegistrationProps {
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface ValidationErrors {
  message: string;
  errors: Array<string>;
}

export interface RegistrationPayload {
  user: User;
  token: string;
  message: string;
}

export interface LoginPayload {
  user: User;
  token: string;
  message: string;
}
