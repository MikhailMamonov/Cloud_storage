import React, { FC, useEffect } from 'react';

import './disk.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import {
  getFiles,
  setCurrentDir,
  popFromStack,
  setPopupDisplay,
} from '../../store/features/files/fileSlice';
import FileList from './fileList/FileList';
import Popup from './Popup';

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

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back" onClick={() => onBackClick()}>
          Назад
        </button>
        <button className="disk__create" onClick={() => onShowPopup()}>
          Создать папку
        </button>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;
