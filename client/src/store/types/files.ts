export interface IFile {
  _id: string;
  name: string;
  type: string;
  accessLink?: string;
  size: number;
  path: string;
  date: string;
  user: string;
  parent: string;
  childs: [string];
}

export interface FileState {
  files: Array<IFile>;
  currentDir: string | null;
  popupDisplay: string;
  dirStack: Array<string | null>;
  view: string;
}

export interface CreateDirProps {
  dirId: string;
  name: string;
}

export interface GetFilesProps {
  dirId: string | null;
  sort: string;
}

export interface UploadFileProps {
  dirId: string | null;
  file: File;
}

export interface DownloadFileProps {
  file: IFile;
}
