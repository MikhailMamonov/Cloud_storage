import { File } from '../../files/types/File';

export interface User {
  id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string;
  files: Array<File>[];
}
