import React, { FC } from 'react';
import './file.scss';
import dirLogo from '../../../../assets/dir.svg';
import fileLogo from '../../../../assets/file.svg';
import { IFile } from 'store/types/files';
import {
  setCurrentDir,
  pushToStack,
} from '../../../../store/features/files/fileSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useSelector';
import { deleteFile, downloadFile } from 'store/actions/files';
import sizeFormat from '../../../../utils/sizeFormat';

interface FileProps {
  file: IFile;
}

const File: FC<FileProps> = ({ file }) => {
  const dispatch = useAppDispatch();
  const { currentDir, view: fileView } = useAppSelector((state) => state.file);
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

  if (fileView === 'list') {
    return (
      <div className="file" onClick={(e) => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=""
          className="file__img"
        />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
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
  }

  if (fileView === 'plate') {
    return (
      <div className="file-plate" onClick={(e) => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=""
          className="file-plate__img"
        />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          {file.type !== 'dir' && (
            <button
              className="file-plate__btn file-plate__download"
              onClick={(e) => onDownloadHandler(e)}
            >
              Загрузить
            </button>
          )}
          <button
            className="file-plate__btn file-plate__delete"
            onClick={(e) => onDeleteHandler(e)}
          >
            Удалить
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default File;
