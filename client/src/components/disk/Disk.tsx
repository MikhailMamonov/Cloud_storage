import React, { ChangeEvent, FC, useEffect } from 'react';

import './disk.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import {
  setCurrentDir,
  popFromStack,
  setPopupDisplay,
} from '../../store/features/files/fileSlice';
import FileList from './fileList/FileList';
import Popup from './Popup';
import { getFiles, uploadFile } from '../../store/features/files/actions';
import { UploadFileProps } from '../../store/features/files/types';

const Disk: FC = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector((state) => state.file.currentDir);
  const [...dirStackCopy] = useAppSelector((state) => state.file.dirStack);
  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  function onShowPopup(): void {
    dispatch(setPopupDisplay('flex'));
  }

  function onBackClick(): void {
    const backDirId = dirStackCopy.pop();
    dispatch(setCurrentDir(backDirId));
    dispatch(popFromStack());
  }

  function onFileUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const fileListAsArray = Array.from(event.target.files);
      fileListAsArray.forEach((file) => {
        dispatch(uploadFile({ file, dirId: currentDir } as UploadFileProps));
      });
    }
  }

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back" onClick={() => onBackClick()}>
          Назад
        </button>
        <button className="disk__create" onClick={() => onShowPopup()}>
          Создать папку
        </button>
        <div className="disk___upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Загрузить файл
          </label>
          <input
            onChange={(e) => onFileUpload(e)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;
