import React, { FC, useEffect } from 'react';

import './disk.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import {
  getFiles,
  setPopupDisplay,
} from '../../store/features/files/fileSlice';
import FileList from './fileList/FileList';
import Popup from './Popup';

const Disk: FC = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector((state) => state.file.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  function onShowPopup(): void {
    dispatch(setPopupDisplay('flex'));
  }

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back">Назад</button>
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
