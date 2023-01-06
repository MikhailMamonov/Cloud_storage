import React, { FC } from 'react';
import './file.scss';
import dirLogo from '../../../../assets/dir.svg';
import fileLogo from '../../../../assets/file.svg';
import { IFile } from '../../../../store/features/files/types';
import {
  setCurrentDir,
  pushToStack,
} from '../../../../store/features/files/fileSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useSelector';
import {
  deleteFile,
  downloadFile,
} from '../../../../store/features/files/actions';

interface FileProps {
  file: IFile;
}

const File: FC<FileProps> = ({ file }) => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector((state) => state.file.currentDir);
  function openDirHandler(file: IFile) {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  function onDownloadHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.stopPropagation();
    downloadFile(file);
  }

  function onDeleteHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    console.log('delete');
    event.stopPropagation();
    dispatch(deleteFile(file));
  }

  return (
    <div className="file" onClick={(e) => openDirHandler(file)}>
      <img
        src={file.type === 'dir' ? dirLogo : fileLogo}
        alt=""
        className="file__img"
      />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
      {file.type !== 'dir' && (
        <button
          className="file__btn file__download"
          onClick={(e) => onDownloadHandler(e)}
        >
          Загрузить
        </button>
      )}
      <button
        className="file__btn file__delete"
        onClick={(e) => onDeleteHandler(e)}
      >
        Удалить
      </button>
    </div>
  );
};

export default File;
