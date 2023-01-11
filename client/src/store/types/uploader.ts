export interface UploadedFile {
  id: number;
  progress?: number;
  name: string;
}

export interface UploaderState {
  files: Array<UploadedFile>;
  isVisible: boolean;
}
