export interface CustomError {
  message?: string;
  stackTrace?: string;
}

export interface UserState {
  loader: boolean;
  error: CustomError | null | undefined;
}
